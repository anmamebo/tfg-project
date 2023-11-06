from rest_framework.routers import DefaultRouter

from users.api.api import UserViewSet
from users.api.viewsets.group_viewsets import GroupViewSet

router = DefaultRouter()

router.register(r'users', UserViewSet, basename="users")
router.register(r'groups', GroupViewSet, basename="groups")

urlpatterns = router.urls