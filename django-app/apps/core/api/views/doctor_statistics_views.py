import math

from apps.appointments.models import Appointment
from apps.doctors.models import Doctor
from apps.patients.models import Patient
from apps.schedules.models import Schedule
from apps.treatments.models import Treatment
from django.db.models import Avg, DurationField, ExpressionWrapper, F, Sum
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


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


def get_total_patients_completed(doctor):
    return Appointment.objects.filter(doctor=doctor, status="completed").count()


def get_total_treatments_prescribed(doctor):
    return Treatment.objects.filter(doctor=doctor).count()


def get_total_duration(doctor):
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
