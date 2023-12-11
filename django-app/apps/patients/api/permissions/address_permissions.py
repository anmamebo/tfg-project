from apps.patients.models import Address
from config.permissions import is_administrator, is_doctor, is_patient
from rest_framework import permissions


class IsAddressOwner(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el dueño de la dirección.
    También permite el acceso a usuarios que pertenezcan al grupo Administrativo y Médico.
    """

    def has_object_permission(self, request, view, obj):
        if is_administrator(request.user) or is_doctor(request.user):
            return True

        if is_patient(request.user):
            patient = getattr(request.user, "patient", None)

            if isinstance(obj, Address):
                return obj == patient.address

        return False
