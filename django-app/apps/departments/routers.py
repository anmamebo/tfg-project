from apps.departments.viewsets import DepartmentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"", DepartmentViewSet, basename="departments")

urlpatterns = router.urls
