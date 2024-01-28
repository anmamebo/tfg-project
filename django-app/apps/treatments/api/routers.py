from apps.treatments.api.viewsets.treatment_viewsets import TreatmentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", TreatmentViewSet, basename="treatments")

urlpatterns = router.urls
