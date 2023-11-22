from rest_framework.routers import DefaultRouter

from doctors.api.viewsets.doctor_viewsets import DoctorViewSet
from doctors.api.viewsets.medicalspecialty_viewsets import MedicalSpecialtyViewSet

router = DefaultRouter()

router.register(r'doctors', DoctorViewSet, basename="doctors")
router.register(r'medicalspecialties', MedicalSpecialtyViewSet, basename="medicalspecialties")

urlpatterns = router.urls