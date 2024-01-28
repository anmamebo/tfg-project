from apps.medicalspecialties.api.viewsets.medicalspecialty_viewsets import (
    MedicalSpecialtyViewSet,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", MedicalSpecialtyViewSet, basename="medicalspecialties")

urlpatterns = router.urls
