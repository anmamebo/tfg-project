from apps.appointments.viewsets import AppointmentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", AppointmentViewSet, basename="appointments")

urlpatterns = router.urls
