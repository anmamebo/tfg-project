from apps.doctors.models import Doctor
from config.permissions import is_doctor
from rest_framework import permissions


class IsSelfDoctor(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el dueño del doctor.
    """

    def has_object_permission(self, request, view, obj):

        if is_doctor(request.user):
            doctor = getattr(request.user, "doctor", None)

            return isinstance(obj, Doctor) and obj == doctor

        return True
