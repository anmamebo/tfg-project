"""
URL configuration for django-app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from apps.users.views import ForgetPassword, Login, Logout, ResetPassword
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

schema_view = get_schema_view(
    openapi.Info(
        title="Django REST API",
        default_version="v1",
        description="Django REST API for a medical appointment system.",
        contact=openapi.Contact(email="anmamebo2001@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path(
        "swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("admin/", admin.site.urls),
    path("api/logout/", Logout.as_view(), name="logout"),
    path("api/login/", Login.as_view(), name="login"),
    path("api/forget-password/", ForgetPassword.as_view(), name="forget_password"),
    path("api/reset-password/", ResetPassword.as_view(), name="reset_password"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/users/", include("apps.users.routers")),
    path("api/groups/", include("apps.groups.routers")),
    path("api/patients/", include("apps.patients.routers")),
    path("api/addresses/", include("apps.addresses.routers")),
    path("api/doctors/", include("apps.doctors.routers")),
    path("api/medicalspecialties/", include("apps.medicalspecialties.routers")),
    path("api/schedules/", include("apps.schedules.routers")),
    path("api/rooms/", include("apps.rooms.routers")),
    path("api/departments/", include("apps.departments.routers")),
    path("api/appointments/", include("apps.appointments.routers")),
    path("api/treatments/", include("apps.treatments.routers")),
    path("api/medicaltests/", include("apps.medicaltests.routers.medicaltest_routers")),
    path(
        "api/medicaltestattachments/",
        include("apps.medicaltests.routers.medicaltestattachment_routers"),
    ),
    path("api/statistics/", include("apps.statistics.routers.statistics_routers")),
    path(
        "api/doctor-statistics/",
        include("apps.statistics.routers.doctor_statistics_routers"),
    ),
    path(
        "api/patient-statistics/",
        include("apps.statistics.routers.patient_statistics_routers"),
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
