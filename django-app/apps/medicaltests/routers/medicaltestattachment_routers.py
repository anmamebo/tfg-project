from apps.medicaltests.viewsets.medicaltestattachment_viewsets import (
    MedicalTestAttachmentViewSet,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", MedicalTestAttachmentViewSet, basename="medicaltests-attachments")

urlpatterns = router.urls
