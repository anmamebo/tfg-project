from apps.medicaltests.viewsets import MedicalTestAttachmentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", MedicalTestAttachmentViewSet, basename="medicaltests-attachments")

urlpatterns = router.urls
