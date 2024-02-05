from apps.patients.models import Patient
from config.permissions import is_patient
from rest_framework import permissions


class IsSelfPatient(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el dueño del paciente.
    """

    def has_object_permission(self, request, view, obj):

        if is_patient(request.user):
            patient = getattr(request.user, "patient", None)

            return isinstance(obj, Patient) and obj == patient

        return True
