from apps.groups.viewsets import GroupViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", GroupViewSet, basename="groups")

urlpatterns = router.urls
