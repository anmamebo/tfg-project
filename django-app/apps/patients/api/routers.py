from rest_framework.routers import DefaultRouter

from apps.patients.api.viewsets.patient_viewsets import PatientViewSet
from apps.patients.api.viewsets.address_viewsets import AddressViewSet

router = DefaultRouter()

router.register(r'patients', PatientViewSet, basename="patients")
router.register(r'addresses', AddressViewSet, basename="addresses")

urlpatterns = router.urls