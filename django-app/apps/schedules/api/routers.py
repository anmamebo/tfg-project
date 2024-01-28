from apps.schedules.api.viewsets.schedule_viewsets import ScheduleViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", ScheduleViewSet, basename="schedules")

urlpatterns = router.urls
