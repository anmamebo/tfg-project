from rest_framework.routers import DefaultRouter

from apps.departments.api.viewsets.department_viewsets import DepartmentViewSet
from apps.departments.api.viewsets.room_viewsets import RoomViewSet

router = DefaultRouter()

router.register(r'departments', DepartmentViewSet, basename="departments")
router.register(r'rooms', RoomViewSet, basename="rooms")

urlpatterns = router.urls