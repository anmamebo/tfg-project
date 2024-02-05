from apps.treatments.models import Treatment
from config.permissions import is_doctor, is_patient
from rest_framework import permissions


class IsTreatmentPatient(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el dueño del tratamiento.
    """

    def has_object_permission(self, request, view, obj):

        if is_patient(request.user):
            patient = getattr(request.user, "patient", None)

            return isinstance(obj, Treatment) and obj.patient == patient

        return True


class IsTreatmentDoctor(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el doctor del tratamiento.
    """

    def has_object_permission(self, request, view, obj):

        if is_doctor(request.user):
            doctor = getattr(request.user, "doctor", None)

            return isinstance(obj, Treatment) and obj.doctor == doctor

        return True


class IsTreatmentsPatient(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el paciente de los tratamientos.
    """

    def has_permission(self, request, view):
        patient_id = request.query_params.get("patient_id")

        if is_patient(request.user) and patient_id is not None:
            patient = getattr(request.user, "patient", None)

            return patient_id == str(patient.id)

        return True
