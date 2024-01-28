from apps.patients.viewsets import PatientViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", PatientViewSet, basename="patients")

urlpatterns = router.urls
