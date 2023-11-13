from rest_framework.routers import DefaultRouter

from doctors.api.viewsets.doctor_viewsets import DoctorViewSet

router = DefaultRouter()

router.register(r'doctors', DoctorViewSet, basename="doctors")

urlpatterns = router.urls