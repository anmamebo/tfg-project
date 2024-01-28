from apps.doctors.api.viewsets.doctor_viewsets import DoctorViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"doctors", DoctorViewSet, basename="doctors")

urlpatterns = router.urls
