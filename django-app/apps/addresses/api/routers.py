from apps.addresses.api.viewsets.address_viewsets import AddressViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"addresses", AddressViewSet, basename="addresses")

urlpatterns = router.urls
