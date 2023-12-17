import math
from datetime import date, datetime, timedelta

import pytz
from apps.appointments.models import Appointment
from apps.doctors.models import Doctor, MedicalSpecialty
from apps.patients.models import Patient
from apps.schedules.models import Schedule
from apps.treatments.models import Treatment
from config.settings import TIME_ZONE
from django.db.models import Avg, Count, DurationField, ExpressionWrapper, F, Sum
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

tz = pytz.timezone(TIME_ZONE)  # Zona horaria de la aplicación


@api_view(["GET"])
def get_overall_stats(request):
    """
    Obtener las estadísticas generales del paciente.

    Args:
        request (Request): Solicitud HTTP.

    Returns:
        Response: Respuesta HTTP.
    """
    patient = request.user.patient

    total_appointments = get_total_appointments(patient)
    next_appointments = get_next_appointment(patient)
    active_treatments = get_active_treatments(patient)
    average_time_per_appointment = get_average_time_per_appointment(patient)

    return Response(
        {
            "total_appointments": total_appointments,
            "next_appointments": next_appointments,
            "active_treatments": active_treatments,
            "average_time_per_appointment": average_time_per_appointment,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_patient_appointments_per_specialty_and_month(request):
    """
    Obtiene el número de citas de un paciente por mes para
    el año especificado, agrupadas por especialidad.

    Parámetros:
        year (int): Año para el que se obtendrán las citas.

    Args:
        request (Request): Solicitud HTTP.

    Returns:
        Response: Respuesta HTTP.
    """
    patient = request.user.patient

    # Obtener el año para el que deseas las citas
    year = int(request.query_params.get("year", datetime.today().year))

    #  Obtener citas filtradas por año
    appointments = Appointment.objects.filter(
        patient=patient, schedule__start_time__year=year
    ).exclude(status="cancelled")

    # Obtener especialidades
    specialty_names = MedicalSpecialty.objects.values_list("name", flat=True)

    # Obtener recuento mensual de citas por especialidad
    monthly_appointments = {}
    for appointment in appointments:
        month = appointment.schedule.start_time.month
        appointment_specialty = appointment.specialty.name

        if month not in monthly_appointments:
            monthly_appointments[month] = {appointment_specialty: 1}
        else:
            if appointment_specialty not in monthly_appointments[month]:
                monthly_appointments[month][appointment_specialty] = 1
            else:
                monthly_appointments[month][appointment_specialty] += 1

    # Rellenar con cero si no hay citas en algún mes para alguna especialidad
    for month in range(1, 13):
        if month not in monthly_appointments:
            monthly_appointments[month] = {
                specialty: 0 for specialty in specialty_names
            }
        else:
            for specialty in specialty_names:
                if specialty not in monthly_appointments[month]:
                    monthly_appointments[month][specialty] = 0

    # Ordenar por mes
    monthly_appointments = dict(sorted(monthly_appointments.items()))

    return Response(
        monthly_appointments,
        status=status.HTTP_200_OK,
    )


def get_total_appointments(patient):
    """
    Obtiene el número total de citas de un paciente que no han sido canceladas.

    Args:
        patient (Patient): Paciente.

    Returns:
        int: Número total de citas.
    """
    return (
        Appointment.objects.filter(patient=patient).exclude(status="cancelled").count()
    )


def get_next_appointment(patient):
    """
    Obtiene el número de citas que tiene próximas un paciente.

    Args:
        patient (Patient): Paciente.

    Returns:
        int: Número de citas próximas.
    """
    return (
        Appointment.objects.filter(patient=patient)
        .filter(
            patient=patient,
            status__in=["scheduled", "rescheduled"],
            schedule__start_time__gte=date.today(),
        )
        .count()
    )


def get_active_treatments(patient):
    """
    Obtiene el número de tratamientos activos de un paciente.

    Args:
        patient (Patient): Paciente.

    Returns:
        int: Número de tratamientos activos.
    """
    return Treatment.objects.filter(patient=patient, status="in_progress").count()


def get_average_time_per_appointment(patient):
    """
    Obtiene el tiempo promedio de las citas de un paciente.

    Args:
        patient (Patient): Paciente.

    Returns:
        str: Tiempo promedio de las citas en formato HH:MM:SS.
    """
    avg_time = (
        Appointment.objects.filter(patient=patient, status="completed")
        .annotate(
            time_in_seconds=ExpressionWrapper(
                F("end_time") - F("time_patient_arrived"), output_field=DurationField()
            )
        )
        .aggregate(avg_time=Avg("time_in_seconds"))["avg_time"]
    )

    avg_time_in_seconds = avg_time.total_seconds() if avg_time else 0
    avg_hours = math.floor(avg_time_in_seconds // 3600)
    avg_minutes = math.floor((avg_time_in_seconds % 3600) // 60)
    avg_seconds = math.floor(avg_time_in_seconds % 60)
    avg_time_in_hms = f"{avg_hours}h {avg_minutes}m {avg_seconds}s"

    return avg_time_in_hms
