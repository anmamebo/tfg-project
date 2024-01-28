from apps.statistics.views.statistics_views import (
    average_waiting_time,
    get_appointment_statuses,
    get_appointments_per_age,
    get_appointments_per_day,
    get_appointments_per_day_and_gender,
    get_appointments_per_month_and_type,
    get_overall_stats,
    medical_specialty_doctor_count,
)
from django.urls import path

urlpatterns = [
    path("general/", get_overall_stats, name="statistics"),
    path(
        "appointments-per-day/",
        get_appointments_per_day,
        name="appointments_per_day",
    ),
    path(
        "appointment-statuses/",
        get_appointment_statuses,
        name="appointment_statuses",
    ),
    path("average-waiting-time/", average_waiting_time, name="average_waiting_time"),
    path(
        "appointments-per-day-and-gender/",
        get_appointments_per_day_and_gender,
        name="get_appointments_per_day_and_gender",
    ),
    path(
        "appointments-per-month-and-type/",
        get_appointments_per_month_and_type,
        name="get_appointments_per_month_and_type",
    ),
    path(
        "medical-specialty-doctor-count/",
        medical_specialty_doctor_count,
        name="medical_specialty_doctor_count",
    ),
    path(
        "appointments-per-age/",
        get_appointments_per_age,
        name="get_appointments_per_age",
    ),
]
