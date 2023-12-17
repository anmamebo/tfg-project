from apps.core.api.views.patient_statistics_views import (
    get_overall_stats,
    get_patient_appointments_per_specialty_and_month,
)
from django.urls import path

urlpatterns = [
    path("get_overall_stats/", get_overall_stats, name="patient_statistics"),
    path(
        "get_patient_appointments_per_specialty_and_month/",
        get_patient_appointments_per_specialty_and_month,
        name="patient_appointments_per_specialty_and_month",
    ),
]
