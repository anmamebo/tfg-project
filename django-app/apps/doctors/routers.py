from apps.doctors.viewsets import DoctorViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", DoctorViewSet, basename="doctors")

urlpatterns = router.urls
