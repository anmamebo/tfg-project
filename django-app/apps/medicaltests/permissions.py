from apps.medicaltests.models import MedicalTest, MedicalTestAttachment
from config.permissions import is_doctor, is_patient
from rest_framework import permissions


class IsMedicalTestDoctor(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el doctor del examen médico.
    """

    def has_object_permission(self, request, view, obj):

        if is_doctor(request.user):
            doctor = getattr(request.user, "doctor", None)

            return isinstance(obj, MedicalTest) and obj.doctor == doctor

        return True


class IsMedicalTestsPatient(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el paciente de los exámenes médicos.
    """

    def has_permission(self, request, view):
        patient_id = request.query_params.get("patient_id")

        if is_patient(request.user) and patient_id is not None:
            patient = getattr(request.user, "patient", None)

            return patient_id == str(patient.id)

        return True


class IsAttachmentPatient(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el paciente del archivo adjunto.
    """

    def has_object_permission(self, request, view, obj):

        if is_patient(request.user):
            patient = getattr(request.user, "patient", None)

            return (
                isinstance(obj, MedicalTestAttachment)
                and obj.medical_test.patient == patient
            )

        return True
