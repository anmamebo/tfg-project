from apps.users.api.viewsets.group_viewsets import GroupViewSet
from apps.users.api.viewsets.permission_viewsets import PermissionViewSet
from apps.users.api.viewsets.user_viewsets import UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"users", UserViewSet, basename="users")
router.register(r"groups", GroupViewSet, basename="groups")
router.register(r"permissions", PermissionViewSet, basename="permissions")

urlpatterns = router.urls
