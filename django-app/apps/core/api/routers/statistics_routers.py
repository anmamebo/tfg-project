from apps.core.api.views.statistics_views import (
    average_waiting_time,
    get_appointment_statuses,
    get_appointments_per_day,
    get_appointments_per_day_and_gender,
    get_appointments_per_month_and_type,
    get_overall_stats,
    medical_specialty_doctor_count,
)
from django.urls import path

urlpatterns = [
    path("get_overall_stats/", get_overall_stats, name="statistics"),
    path(
        "get_appointments_per_day/",
        get_appointments_per_day,
        name="appointments_per_day",
    ),
    path(
        "get_appointment_statuses/",
        get_appointment_statuses,
        name="appointment_statuses",
    ),
    path("average_waiting_time/", average_waiting_time, name="average_waiting_time"),
    path(
        "get_appointments_per_day_and_gender/",
        get_appointments_per_day_and_gender,
        name="get_appointments_per_day_and_gender",
    ),
    path(
        "get_appointments_per_month_and_type/",
        get_appointments_per_month_and_type,
        name="get_appointments_per_month_and_type",
    ),
    path(
        "medical_specialty_doctor_count/",
        medical_specialty_doctor_count,
        name="medical_specialty_doctor_count",
    ),
]
