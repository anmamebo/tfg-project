from apps.doctors.models import Doctor
from config.permissions import is_administrator, is_doctor
from rest_framework import permissions


class IsSelfDoctor(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el dueño del doctor.
    También permite el acceso a usuarios que pertenezcan al grupo Administrativo.
    """

    def has_object_permission(self, request, view, obj):
        if is_administrator(request.user):
            return True

        if is_doctor(request.user):
            doctor = getattr(request.user, "doctor", None)

            if isinstance(obj, Doctor):
                return obj == doctor

        return False
