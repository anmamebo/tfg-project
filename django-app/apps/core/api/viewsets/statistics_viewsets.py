from datetime import datetime, timedelta

import pytz
from apps.appointments.models import Appointment
from apps.departments.models import Department
from apps.doctors.models import Doctor
from apps.patients.models import Patient
from apps.schedules.models import Schedule
from config.settings import TIME_ZONE
from django.db.models import Avg, Count, DurationField, ExpressionWrapper, F
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
    total_patients = Patient.objects.count()
    total_doctors = Doctor.objects.count()
    total_departments = Department.objects.count()
    total_appointments = Appointment.objects.count()

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

    # Obtener el primer día del mes
    start_date = datetime(year, month, 1)

    # Obtener el primer día del siguiente mes
    next_month = month % 12 + 1 if month < 12 else 1
    next_year = year if next_month != 1 else year + 1
    start_next_month = datetime(next_year, next_month, 1)

    # Restar un segundo al primer día del siguiente mes para obtener el último segundo del mes actual
    end_date = start_next_month - timedelta(seconds=1)

    # Convertir las fechas a la zona horaria de la aplicación
    start_date = tz.localize(start_date)
    end_date = tz.localize(end_date)

    # Crear una lista de fechas dentro del rango
    date_range = [
        start_date + timedelta(days=x) for x in range((end_date - start_date).days + 1)
    ]
    dates_dict = {date.strftime("%Y-%m-%d"): 0 for date in date_range}

    appointments = (
        Appointment.objects.filter(schedule__start_time__range=[start_date, end_date])
        .extra(select={"date": "DATE({}.start_time)".format(Schedule._meta.db_table)})
        .values("date")
        .annotate(count=Count("id"))
        .order_by("date")
    )

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
