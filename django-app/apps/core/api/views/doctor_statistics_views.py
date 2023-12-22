import math
from collections import defaultdict
from datetime import date, datetime, timedelta

import pytz
from apps.appointments.models import Appointment
from apps.doctors.models import Doctor
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
    Obtener las estadísticas generales del médico

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    user = request.user
    doctor = user.doctor

    total_appointments_completed = get_total_patients_completed(doctor)

    total_treatments_prescribed = get_total_treatments_prescribed(doctor)

    total_duration_in_hms = get_total_duration(doctor)

    average_time_per_patient = get_average_time_per_patient(doctor)

    return Response(
        {
            "total_appointments_completed": total_appointments_completed,
            "total_treatments_prescribed": total_treatments_prescribed,
            "total_duration_in_hms": total_duration_in_hms,
            "average_time_per_patient": average_time_per_patient,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_appointments_per_day(request):
    """
    Obtener el número de citas por día para el mes y año especificados
    para un médico concreto.

    Parámetros:
        year (int): Año para el que se obtendrán las citas
        month (int): Mes para el que se obtendrán las citas

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    doctor = request.user.doctor

    # Obtener el mes y el año de los parámetros de la solicitud
    year = int(request.GET.get("year", datetime.now().year))
    month = int(request.GET.get("month", datetime.now().month))

    start_date, end_date, date_range = get_date_range(year, month)

    appointments = (
        Appointment.objects.filter(
            schedule__start_time__range=[start_date, end_date], doctor=doctor
        )
        .extra(select={"date": "DATE({}.start_time)".format(Schedule._meta.db_table)})
        .values("date")
        .annotate(count=Count("id"))
        .order_by("date")
    )

    dates_dict = {date.strftime("%Y-%m-%d"): 0 for date in date_range}

    # Mapear las citas a las fechas y actualizar el recuento si hay citas para esa fecha
    for appointment in appointments:
        date_str = appointment["date"].strftime("%Y-%m-%d")
        if date_str in dates_dict:
            dates_dict[date_str] = appointment["count"]

    # Crear la lista final con todas las fechas y sus recuentos
    appointments_per_day_list = [
        {"date": date, "value": count} for date, count in dates_dict.items()
    ]

    return Response(
        appointments_per_day_list,
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_appointments_per_gender(request):
    """
    Obtener el número de citas por género para un médico concreto.

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    doctor = request.user.doctor

    appointments = (
        Appointment.objects.filter(doctor=doctor)
        .values("patient__gender")
        .annotate(count=Count("id"))
    )

    appointments_per_gender = [
        {"gender": data["patient__gender"], "value": data["count"]}
        for data in appointments
    ]

    return Response(
        appointments_per_gender,
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_appointments_per_specialty(request):
    """
    Obtener el número de citas por especialidad para un médico concreto.

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    doctor = request.user.doctor

    appointments = (
        Appointment.objects.filter(doctor=doctor)
        .values("specialty__name")
        .annotate(count=Count("id"))
    )

    appointments_per_specialty = [
        {"specialty": data["specialty__name"], "value": data["count"]}
        for data in appointments
    ]

    return Response(
        appointments_per_specialty,
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_appointments_per_age(request):
    """
    Obtener el número de citas por edad para un médico concreto.

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    doctor = request.user.doctor

    today = date.today()
    max_date = today.year
    min_date = max_date - 100

    groups = [
        (max_date - 0, max_date - 12),
        (max_date - 13, max_date - 18),
        (max_date - 19, max_date - 30),
        (max_date - 31, max_date - 50),
        (max_date - 51, max_date - 65),
        (max_date - 66, min_date),
    ]

    appointments_by_age_group = defaultdict(int)

    for age_min, age_max in groups:
        age_group = f"{datetime.now().year - age_min}-{datetime.now().year - age_max}"
        appointments_by_age_group[age_group] = Appointment.objects.filter(
            doctor=doctor,
            patient__birthdate__year__gte=age_max,
            patient__birthdate__year__lte=age_min,
        ).count()

    appointments_by_age_group_list = [
        {"age_group": age_group, "count": count}
        for age_group, count in appointments_by_age_group.items()
    ]

    return Response(
        appointments_by_age_group_list,
        status=status.HTTP_200_OK,
    )


def get_total_patients_completed(doctor):
    """
    Obtiene el número total de pacientes atendidos por un médico,
    citas completadas.

    Args:
        doctor (Doctor): Médico

    Returns:
        int: Número total de pacientes atendidos
    """
    return Appointment.objects.filter(doctor=doctor, status="completed").count()


def get_total_treatments_prescribed(doctor):
    """
    Obtiene el número total de tratamientos prescritos por un médico.

    Args:
        doctor (Doctor): Médico

    Returns:
        int: Número total de tratamientos prescritos
    """
    return Treatment.objects.filter(doctor=doctor).count()


def get_total_duration(doctor):
    """
    Obtiene la suma de las duraciones de las citas completadas de un médico
    (tiempo trabajado).

    Args:
        doctor (Doctor): Médico

    Returns:
        str: Duración total en formato HH:mm:ss
    """
    total_duration = (
        Schedule.objects.filter(
            appointment__doctor=doctor, appointment__status="completed"
        )
        .annotate(
            duration_in_seconds=ExpressionWrapper(
                F("end_time") - F("start_time"), output_field=DurationField()
            ),
        )
        .aggregate(total_duration=Sum("duration_in_seconds"))["total_duration"]
    )

    total_duration_in_seconds = total_duration.total_seconds() if total_duration else 0
    total_hours = math.floor(total_duration_in_seconds // 3600)
    total_minutes = math.floor((total_duration_in_seconds % 3600) // 60)
    total_seconds = math.floor(total_duration_in_seconds % 60)
    total_duration_in_hms = f"{total_hours}h {total_minutes}m {total_seconds}s"

    return total_duration_in_hms


def get_average_time_per_patient(doctor):
    """
    Obtiene el tiempo promedio de las citas de un médico.

    Args:
        doctor (Doctor): Médico

    Returns:
        str: Tiempo promedio de las citas en formato HH:MM:SS.
    """
    avg_time = (
        Appointment.objects.filter(doctor=doctor, status="completed")
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


def get_date_range(year, month):
    """
    Obtiene el primer día del mes, el último día del mes y una lista de fechas dentro del rango

    Args:
        year (int): Año para el que se obtendrán las citas
        month (int): Mes para el que se obtendrán las citas

    Returns:
        tuple: Tupla con el primer día del mes, el último día del mes y una lista de fechas dentro del rango
    """
    start_date = datetime(year, month, 1)
    next_month = month % 12 + 1 if month < 12 else 1
    next_year = year if next_month != 1 else year + 1
    start_next_month = datetime(next_year, next_month, 1)
    end_date = start_next_month - timedelta(seconds=1)

    start_date = tz.localize(start_date)
    end_date = tz.localize(end_date)

    date_range = [
        start_date + timedelta(days=x) for x in range((end_date - start_date).days + 1)
    ]

    return start_date, end_date, date_range
