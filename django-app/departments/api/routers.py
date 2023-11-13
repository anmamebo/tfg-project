from rest_framework.routers import DefaultRouter

from departments.api.viewsets.department_viewsets import DepartmentViewSet
from departments.api.viewsets.room_viewsets import RoomViewSet

router = DefaultRouter()

router.register(r'departments', DepartmentViewSet, basename="departments")
router.register(r'rooms', RoomViewSet, basename="rooms")

urlpatterns = router.urls