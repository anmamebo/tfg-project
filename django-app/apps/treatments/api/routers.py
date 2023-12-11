from apps.treatments.api.viewsets.treatment_viewsets import TreatmentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"treatments", TreatmentViewSet, basename="treatments")

urlpatterns = router.urls
