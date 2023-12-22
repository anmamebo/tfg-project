from collections import defaultdict
from datetime import date, datetime, timedelta

import pytz
from apps.appointments.models import Appointment
from apps.departments.models import Department
from apps.doctors.api.serializers.medicalspecialty_serializer import (
    MedicalSpecialtyStatisticsSerializer,
)
from apps.doctors.models import Doctor, MedicalSpecialty
from apps.patients.models import Patient
from apps.schedules.models import Schedule
from config.settings import TIME_ZONE
from django.db.models import Avg, Count, DurationField, ExpressionWrapper, F
from django.db.models.functions import TruncDate
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

tz = pytz.timezone(TIME_ZONE)  # Zona horaria de la aplicación


@api_view(["GET"])
def get_overall_stats(request):
    """
    Obtener las estadísticas generales de la aplicación

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    total_patients = Patient.objects.filter(state=True).count()
    total_doctors = Doctor.objects.filter(state=True).count()
    total_departments = Department.objects.filter(state=True).count()
    total_appointments = Appointment.objects.filter(state=True).count()

    return Response(
        {
            "total_patients": total_patients,
            "total_doctors": total_doctors,
            "total_departments": total_departments,
            "total_appointments": total_appointments,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_appointments_per_day(request):
    """
    Obtener el número de citas por día para el mes y año especificados.

    Parámetros:
        year (int): Año para el que se obtendrán las citas
        month (int): Mes para el que se obtendrán las citas

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    # Obtener el mes y el año de los parámetros de la solicitud
    year = int(request.GET.get("year", datetime.now().year))
    month = int(request.GET.get("month", datetime.now().month))

    # Obtiene el primer día del mes, el último día del mes y una lista de fechas dentro del rango
    start_date, end_date, date_range = get_date_range(year, month)

    appointments = (
        Appointment.objects.filter(schedule__start_time__range=[start_date, end_date])
        .extra(select={"date": "DATE({}.start_time)".format(Schedule._meta.db_table)})
        .values("date")
        .annotate(count=Count("id"))
        .order_by("date")
    )

    # Establece la fecha como clave del diccionario y el valor como el recuento
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
def get_appointment_statuses(request):
    """
    Obtiene los diferentes estados de las citas y el número de citas en cada estado.

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    appointment_statuses = (
        Appointment.objects.values("status")
        .annotate(count=Count("id"))
        .order_by("status")
    )

    # Formatear los datos para la respuesta
    statuses_data = [
        {"status": item["status"], "count": item["count"]}
        for item in appointment_statuses
    ]

    return Response(statuses_data, status=200)


@api_view(["GET"])
def average_waiting_time(request):
    """
    Obtiene el tiempo de espera promedio de las citas

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    average_wait_time = Appointment.objects.annotate(
        wait_time=ExpressionWrapper(
            F("schedule__start_time") - F("request_date"), output_field=DurationField()
        )
    ).aggregate(avg_wait_time=Avg("wait_time"))

    avg_wait_days = (
        average_wait_time["avg_wait_time"].days
        + average_wait_time["avg_wait_time"].seconds / (24 * 3600)
        if average_wait_time["avg_wait_time"]
        else None
    )
    return Response(
        {"average_waiting_time_days": avg_wait_days},
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_appointments_per_day_and_gender(request):
    """
    Obtiene el número de citas por día para el mes y año especificados, agrupadas por género.

    Parámetros:
        year (int): Año para el que se obtendrán las citas
        month (int): Mes para el que se obtendrán las citas

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    # Obtener el mes y el año de los parámetros de la solicitud
    year = int(request.GET.get("year", datetime.now().year))
    month = int(request.GET.get("month", datetime.now().month))

    if month < 1 or month > 12:
        return Response(
            {"message": "El mes debe estar entre 1 y 12"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if year < 1:
        return Response(
            {"message": "El año debe ser mayor a 0"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Obtiene el primer día del mes, el último día del mes y una lista de fechas dentro del rango
    start_date, end_date, date_range = get_date_range(year, month)

    # Formato [{'date': datetime.date(2023, 12, 5), 'gender': 'M', 'count': 1}, {...}, ...]
    appointments = (
        Appointment.objects.filter(schedule__start_time__range=[start_date, end_date])
        .annotate(gender=F("patient__gender"))
        .extra(select={"date": "DATE({}.start_time)".format(Schedule._meta.db_table)})
        .values("date", "gender")
        .annotate(count=Count("id"))
        .order_by("date", "gender")
    )

    # Establece la fecha como clave del diccionario y el valor como otro diccionario con el recuento por género
    dates_dict = {}
    for date in date_range:
        date_str = date.strftime("%Y-%m-%d")
        dates_dict[date_str] = {"M": 0, "F": 0}

    # Mapear las citas a las fechas y actualizar el recuento si hay citas para esa fecha
    for appointment in appointments:
        date_str = appointment["date"].strftime("%Y-%m-%d")
        gender = appointment["gender"]
        count = appointment["count"]

        dates_dict[date_str][gender] += count

    # Crear la lista final con todas las fechas y sus recuentos por género
    appointments_per_day_list = [
        {
            "date": date,
            "genders": [
                {"name": gender, "count": count} for gender, count in data.items()
            ],
        }
        for date, data in dates_dict.items()
    ]

    return Response(
        appointments_per_day_list,
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_appointments_per_month_and_type(request):
    """
    Obtiene el número de citas por mes para el año especificado, agrupadas por tipo.

    Parámetros:
        year (int): Año para el que se obtendrán las citas

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    # Obtener el año para el que deseas las citas
    year = int(request.query_params.get("year", datetime.now().year))

    if year < 1:
        return Response(
            {"message": "El año debe ser mayor a 0"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    #  Obtener citas filtradas por año
    appointments = Appointment.objects.filter(schedule__start_time__year=year)

    # Obtener los tipos de cita disponibles del modelo Appointment
    appointment_types = Appointment.type_choices
    type_keys = [key for key, _ in appointment_types]

    # Establece el mes como clave del diccionario y el valor como otro diccionario con el recuento por tipo
    dates_dict = {}
    for month in range(1, 13):
        dates_dict[month] = {type_key: 0 for type_key in type_keys}

    # Mapear las citas a los meses y actualizar el recuento si hay citas para ese mes
    for appointment in appointments:
        date = appointment.schedule.start_time.month
        appointment_type = appointment.type

        dates_dict[date][appointment_type] += 1

    appointments_per_month_and_type_list = [
        {
            "month": month,
            "types": [{"name": type, "count": count} for type, count in data.items()],
        }
        for month, data in dates_dict.items()
    ]

    return Response(
        appointments_per_month_and_type_list,
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def medical_specialty_doctor_count(request):
    """
    Obtiene el número de doctores por especialidad médica.

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
    specialties = (
        MedicalSpecialty.objects.filter(state=True)
        .annotate(doctor_count=Count("doctor"))
        .order_by("name")
    )
    serializer = MedicalSpecialtyStatisticsSerializer(specialties, many=True)

    return Response(
        serializer.data,
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_appointments_per_age(request):
    """
    Obtener el número de citas por edad.

    Args:
        request (Request): Solicitud HTTP

    Returns:
        Response: Respuesta HTTP
    """
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
