from rest_framework.routers import DefaultRouter

from apps.schedules.api.viewsets.schedule_viewsets import ScheduleViewSet

router = DefaultRouter()

router.register(r'schedules', ScheduleViewSet, basename="schedules")

urlpatterns = router.urls