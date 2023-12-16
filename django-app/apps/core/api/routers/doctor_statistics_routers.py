from apps.core.api.views.doctor_statistics_views import get_overall_stats
from django.urls import path

urlpatterns = [path("get_overall_stats/", get_overall_stats, name="doctor_statistics")]
