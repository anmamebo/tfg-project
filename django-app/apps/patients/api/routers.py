from apps.patients.api.viewsets.address_viewsets import AddressViewSet
from apps.patients.api.viewsets.patient_viewsets import PatientViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"patients", PatientViewSet, basename="patients")
router.register(r"addresses", AddressViewSet, basename="addresses")

urlpatterns = router.urls
