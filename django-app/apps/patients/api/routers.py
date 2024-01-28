from apps.patients.api.viewsets.patient_viewsets import PatientViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"patients", PatientViewSet, basename="patients")

urlpatterns = router.urls
