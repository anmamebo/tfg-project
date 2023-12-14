from apps.core.api.viewsets.statistics_viewsets import (
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
]
