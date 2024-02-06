from apps.medicaltests.viewsets.medicaltest_viewsets import MedicalTestViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", MedicalTestViewSet, basename="medicaltests")

urlpatterns = router.urls
