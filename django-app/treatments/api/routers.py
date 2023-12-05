from rest_framework.routers import DefaultRouter

from treatments.api.viewsets.treatment_viewsets import TreatmentViewSet

router = DefaultRouter()

router.register(r'treatments', TreatmentViewSet, basename="treatments")

urlpatterns = router.urls