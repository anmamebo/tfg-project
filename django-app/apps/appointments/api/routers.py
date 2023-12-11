from apps.appointments.api.viewsets.appointment_viewsets import AppointmentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"appointments", AppointmentViewSet, basename="appointments")

urlpatterns = router.urls
