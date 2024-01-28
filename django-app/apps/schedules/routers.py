from apps.schedules.viewsets import ScheduleViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", ScheduleViewSet, basename="schedules")

urlpatterns = router.urls
