from apps.statistics.api.views.doctor_statistics_views import (
    get_appointments_per_age,
    get_appointments_per_day,
    get_appointments_per_gender,
    get_appointments_per_specialty,
    get_overall_stats,
)
from django.urls import path

urlpatterns = [
    path("general/", get_overall_stats, name="doctor_statistics"),
    path(
        "appointments-per-day/",
        get_appointments_per_day,
        name="doctor_appointments_per_day",
    ),
    path(
        "appointments-per-gender/",
        get_appointments_per_gender,
        name="doctor_appointments_per_gender",
    ),
    path(
        "appointments-per-specialty/",
        get_appointments_per_specialty,
        name="doctor_appointments_per_specialty",
    ),
    path(
        "appointments-per-age/",
        get_appointments_per_age,
        name="doctor_appointments_per_age",
    ),
]
