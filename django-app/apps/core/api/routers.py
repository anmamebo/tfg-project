from apps.core.api.viewsets.statistics_viewsets import (
    average_waiting_time,
    get_appointment_statuses,
    get_appointments_per_day,
    get_overall_stats,
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
]
