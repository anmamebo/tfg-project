from apps.departments.api.viewsets.department_viewsets import DepartmentViewSet
from apps.departments.api.viewsets.room_viewsets import RoomViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"departments", DepartmentViewSet, basename="departments")
router.register(r"rooms", RoomViewSet, basename="rooms")

urlpatterns = router.urls
