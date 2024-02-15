from collections import defaultdict
from datetime import datetime, timedelta

import pandas as pd
from apps.appointments.models import Appointment
from apps.departments.models import Department
from apps.doctors.models import Doctor
from apps.rooms.models import Room
from apps.schedules.models import Schedule
from django.db.models import Count, Q
from pulp import LpMinimize, LpProblem, LpVariable, lpSum, value

START_DATE = "2024-02-12"
END_DATE = "2024-02-28"

MORNING_START_TIME = 9
MORNING_END_TIME = 14
AFTERNOON_START_TIME = 15
AFTERNOON_END_TIME = 21

APPOINTMENT_DURATION = 30

NO_PREFERENCE = 0
MORNING_PREFERENCE = 1
AFTERNOON_PREFERENCE = 2


def solve_milp(appointment, hours_preferences_selection):
    print("Solving MILP...")

    start_date, end_date, days = prepare_date_range()

    morning_hours, afternoon_hours, hours = prepare_hours_ranges()

    hours_preferences_dict = prepare_hours_preferences(
        hours, morning_hours, afternoon_hours
    )

    # Obtiene la cita que se va a programar
    appointments = [appointment.id]
    # Obtiene las preferencias de horas para la cita
    hours_preferences = {
        appointment.id: hours_preferences_dict[hours_preferences_selection]
    }

    (
        all_appointments,
        all_doctors,
        all_days,
        all_hours,
        all_rooms,
        scheduled_appointments,
        schedules,
        specialty_rooms_ids,
    ) = prepare_data(appointment, appointments, start_date, end_date, days, hours)

    # Crear un problema de programación lineal
    prob = LpProblem("Asignación_de_Citas", LpMinimize)

    # Definir variables
    X = LpVariable.dicts(
        "Cita",
        (
            (appointment, doctor, day, hour, room)
            for appointment in all_appointments
            for doctor in all_doctors
            for day in all_days
            for hour in all_hours
            for room in all_rooms
        ),
        cat="Binary",
    )

    # Restricción de citas programadas
    # Para cada cita programada, la variable correspondiente debe ser igual a 1
    for a, doc, d, h, r in scheduled_appointments:
        prob += X[a, doc, d, h, r] == 1

    # Restricción de asignación de médico
    # Cada cita debe asignarse a exactamente un médico, una única vez
    for a in all_appointments:
        prob += (
            lpSum(
                X[a, doc, d, h, r]
                for doc in all_doctors
                for d in all_days
                for h in all_hours
                for r in all_rooms
            )
            == 1
        )

    # Restricción de disponibilidad de médicos
    # Para cada médico, día y hora, no puede haber más de una cita, los médicos no pueden estar en dos lugares al mismo tiempo
    for doc in all_doctors:
        for d in all_days:
            for h in all_hours:
                prob += (
                    lpSum(
                        X[a, doc, d, h, r] for a in all_appointments for r in all_rooms
                    )
                    <= 1
                )

    # Restricción de preferencias de horas
    for appointment, preferences in hours_preferences.items():
        prob += (
            lpSum(
                X[appointment, doc, d, h, r]
                for doc in all_doctors
                for d in all_days
                for h in all_hours
                for r in all_rooms
                if h in preferences
            )
            == 1
        )

    # Restricción de horarios laborales para cada médico
    for doc, day_schedules in schedules.items():
        for d, hour_schedules in day_schedules.items():
            for h in all_hours:
                if h not in hour_schedules:
                    prob += (
                        lpSum(
                            X[a, doc, d, h, r]
                            for a in all_appointments
                            for r in all_rooms
                        )
                        == 0
                    )

    # Restriccón de salas no pertenecientes a la especialidad
    for r in all_rooms:
        if r not in specialty_rooms_ids:
            prob += (
                lpSum(
                    X[a, doc, d, h, r]
                    for a in appointments
                    for doc in all_doctors
                    for d in all_days
                    for h in all_hours
                )
                == 0
            )

    # Restricción de salas de consulta
    for r in all_rooms:
        for d in all_days:
            for h in all_hours:
                prob += (
                    lpSum(
                        X[a, doc, d, h, r]
                        for a in all_appointments
                        for doc in all_doctors
                    )
                    <= 1
                )

    # Definir la función objetivo (minimizar el tiempo de espera)
    prob += lpSum(
        (
            (
                datetime.strptime(f"{d} {h}", "%Y-%m-%d %H:%M") - datetime.now()
            ).total_seconds()
            / 60
        )
        * X[a, doc, d, h, r]
        for a in appointments
        for doc in all_doctors
        for d in all_days
        for h in all_hours
        for r in all_rooms
    )

    # Resolver el problema
    prob.solve()

    # Verificar si el problema tiene solución
    if prob.status != 1:
        print("El problema no tiene solución")
        return False

    handle_results(X, appointments, all_doctors, all_days, all_hours, all_rooms)

    print_results_to_txt(
        prob, X, all_appointments, all_doctors, all_days, all_hours, all_rooms
    )

    return True


def prepare_date_range():
    # Definir el rango de fechas en el que se va a buscar la cita
    start_date = datetime.strptime(START_DATE, "%Y-%m-%d")
    end_date = datetime.strptime(END_DATE, "%Y-%m-%d")

    # Obtiene los días pertenecientes al rango de fechas
    days = [
        (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
        for i in range((end_date - start_date).days + 1)
    ]

    return start_date, end_date, days


def prepare_hours_ranges():
    # Obtiene el rango de horas en el turno de la mañana
    morning_hours = [
        f"{h:02}:{m:02}"
        for h in range(MORNING_START_TIME, MORNING_END_TIME + 1)
        for m in range(0, 60, APPOINTMENT_DURATION)
    ]

    # Obtiene el rango de horas en el turno de la tarde
    afternoon_hours = [
        f"{h:02}:{m:02}"
        for h in range(AFTERNOON_START_TIME, AFTERNOON_END_TIME + 1)
        for m in range(0, 60, APPOINTMENT_DURATION)
    ]

    # Define el rango de horas en el que se puede agendar una cita
    hours = morning_hours + afternoon_hours

    return morning_hours, afternoon_hours, hours


def prepare_hours_preferences(hours, morning_hours, afternoon_hours):
    # Diccionario de preferencias de horas
    hours_preferences_dict = {
        NO_PREFERENCE: hours,
        MORNING_PREFERENCE: morning_hours,
        AFTERNOON_PREFERENCE: afternoon_hours,
    }

    return hours_preferences_dict


def prepare_data(appointment, appointments, start_date, end_date, days, hours):
    # Obtener la especialidad de la cita
    specialty = appointment.specialty

    # Obtener los ids de los doctores que tienen la especialidad de la cita
    # y que tienen horarios en el rango de fechas
    doctors_with_specialty = get_doctors_by_specialty(specialty)
    doctors = get_doctors_with_schedules_in_range(
        doctors_with_specialty, start_date, end_date
    )
    doctors_ids = get_ids(doctors)

    # Obtener los horarios de los médicos en el rango de fechas
    schedules_objs = get_all_doctors_schedules(doctors, start_date, end_date)
    schedules = assign_schedules_to_doctors(days, doctors, schedules_objs)

    # Obtener las salas de consulta de la especialidad
    department = get_department_by_specialty(specialty)
    rooms = get_rooms_by_department(department)
    specialty_rooms_ids = get_ids(rooms)

    # Obtiene las citas que ya están programadas en el rango de fechas
    scheduled_appointments = get_appointments_by_doctors_in_range(
        doctors, start_date, end_date
    )
    scheduled_appointments = format_appointments(scheduled_appointments)

    # Obtiene las salas de consulta de las citas programadas
    scheduled_appointments_rooms_ids = [
        appointment[4] for appointment in scheduled_appointments
    ]

    # Obtener todas las salas de consulta
    all_rooms = list(
        set(specialty_rooms_ids).union(set(scheduled_appointments_rooms_ids))
    )
    # Obtener todas las citas
    all_appointments = appointments + [
        appointment[0] for appointment in scheduled_appointments
    ]
    all_doctors = doctors_ids
    all_hours = hours
    all_days = days

    return (
        all_appointments,
        all_doctors,
        all_days,
        all_hours,
        all_rooms,
        scheduled_appointments,
        schedules,
        specialty_rooms_ids,
    )


def handle_results(X, appointments, doctors, days, hours, rooms):
    for a in appointments:
        for doc in doctors:
            for d in days:
                for h in hours:
                    for r in rooms:
                        if X[a, doc, d, h, r].varValue == 1:
                            assign_appointment(a, doc, d, h, r)


def assign_appointment(appointment_id, doctor_id, day, hour, room_id):
    request_appointment = Appointment.objects.get(id=appointment_id)
    assigned_doctor = Doctor.objects.get(id=doctor_id)
    assigned_room = Room.objects.get(id=room_id)
    assigned_datetime = datetime.strptime(f"{day} {hour}", "%Y-%m-%d %H:%M")
    assigned_schedule = Schedule.objects.get(
        doctor=assigned_doctor,
        start_time=assigned_datetime,
    )

    request_appointment.doctor = assigned_doctor
    request_appointment.room = assigned_room
    request_appointment.schedule = assigned_schedule
    request_appointment.status = "scheduled"

    request_appointment.save()


def print_results_to_txt(prob, X, appointments, doctors, days, hours, rooms):
    # Crear un DataFrame para almacenar los resultados
    resultados = []

    # Recorrer todas las variables de decisión y agregar las asignaciones a la lista de resultados
    for a in appointments:
        for doc in doctors:
            for d in days:
                for h in hours:
                    for r in rooms:
                        if X[a, doc, d, h, r].varValue == 1:
                            resultados.append(
                                {
                                    "Cita": a,
                                    "Medico": doc,
                                    "Fecha": d,
                                    "Hora": h,
                                    "Sala": r,
                                }
                            )

    # Convertir la lista de resultados en un DataFrame de Pandas
    df_resultados = pd.DataFrame(resultados)

    # Obtener la marca temporal actual
    marca_temporal = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    # Nombre del archivo de texto
    nombre_archivo = f"milp_results/resultados_{marca_temporal}.txt"
    # Escribir el DataFrame en un archivo de texto
    with open(nombre_archivo, "w") as archivo:
        archivo.write(f"Valor de la funcion objetivo: {value(prob.objective)}\n\n")
        archivo.write(df_resultados.to_string(index=False))


def get_doctors_by_specialty(specialty):
    return Doctor.objects.filter(state=True, medical_specialties=specialty)


def get_doctors_with_schedules_in_range(doctors, start_date, end_date):
    return doctors.annotate(
        num_schedules=Count(
            "schedule",
            filter=Q(
                schedule__start_time__range=[start_date, end_date + timedelta(days=1)]
            ),
        )
    ).filter(num_schedules__gt=0)


def get_ids(objects):
    return [str(obj_id) for obj_id in objects.values_list("id", flat=True)]


def get_all_doctors_schedules(doctors, start_date, end_date):
    return Schedule.objects.filter(
        doctor__in=doctors, start_time__range=[start_date, end_date + timedelta(days=1)]
    )


def assign_schedules_to_doctors(dates, doctors, schedules):
    # Creamos un diccionario con listas vacías para cada médico y fecha dentro del rango
    schedules_dict = defaultdict(lambda: defaultdict(list))
    for doctor in doctors:
        for date in dates:
            schedules_dict[str(doctor.id)][date] = []

    # Obtenemos los horarios reales y los agregamos al diccionario
    for schedule in schedules:
        doctor_id = str(schedule.doctor_id)
        date_str = schedule.start_time.strftime("%Y-%m-%d")
        hour_str = schedule.start_time.strftime("%H:%M")
        schedules_dict[doctor_id][date_str].append(hour_str)

    return schedules_dict


def get_department_by_specialty(specialty):
    return Department.objects.get(medicalspecialty=specialty)


def get_rooms_by_department(department):
    return Room.objects.filter(department=department)


def get_appointments_by_doctors_in_range(doctors, start_date, end_date):
    return Appointment.objects.filter(
        doctor__in=doctors,
        schedule__start_time__range=[start_date, end_date + timedelta(days=1)],
    )


def format_appointments(appointments):
    scheduled_appointments = []
    for appointment in appointments:
        appointment_info = (
            str(appointment.id),
            str(appointment.doctor.id),
            appointment.schedule.start_time.strftime("%Y-%m-%d"),
            appointment.schedule.start_time.strftime("%H:%M"),
            str(appointment.room.id),
        )
        scheduled_appointments.append(appointment_info)

    return scheduled_appointments
