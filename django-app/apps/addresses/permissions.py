from apps.addresses.models import Address
from config.permissions import is_patient
from rest_framework import permissions


class IsAddressOwner(permissions.BasePermission):
    """
    Verifica si el paciente que hace la petición es el dueño de la dirección.
    """

    def has_object_permission(self, request, view, obj):
        if is_patient(request.user):
            patient = getattr(request.user, "patient", None)

            return isinstance(obj, Address) and obj == patient.address

        return True
