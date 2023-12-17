from apps.core.api.views.doctor_statistics_views import (
    get_appointments_per_age,
    get_appointments_per_day,
    get_appointments_per_gender,
    get_appointments_per_specialty,
    get_overall_stats,
)
from django.urls import path

urlpatterns = [
    path("get_overall_stats/", get_overall_stats, name="doctor_statistics"),
    path(
        "get_appointments_per_day/",
        get_appointments_per_day,
        name="doctor_appointments_per_day",
    ),
    path(
        "get_appointments_per_gender/",
        get_appointments_per_gender,
        name="doctor_appointments_per_gender",
    ),
    path(
        "get_appointments_per_specialty/",
        get_appointments_per_specialty,
        name="doctor_appointments_per_specialty",
    ),
    path(
        "get_appointments_per_age/",
        get_appointments_per_age,
        name="doctor_appointments_per_age",
    ),
]
