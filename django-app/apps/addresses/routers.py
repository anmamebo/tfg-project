from apps.addresses.viewsets import AddressViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", AddressViewSet, basename="addresses")

urlpatterns = router.urls
