from apps.rooms.viewsets import RoomViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", RoomViewSet, basename="rooms")

urlpatterns = router.urls
