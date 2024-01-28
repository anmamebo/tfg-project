from apps.users.api.viewsets.administrative_viewsets import AdministrativeViewSet
from apps.users.api.viewsets.user_viewsets import UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"users", UserViewSet, basename="users")
router.register(r"administratives", AdministrativeViewSet, basename="administrative")

urlpatterns = router.urls
