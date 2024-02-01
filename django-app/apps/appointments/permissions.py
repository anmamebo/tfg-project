from apps.appointments.models import Appointment
from config.permissions import is_administrator, is_doctor, is_patient
from django.shortcuts import get_object_or_404
from rest_framework import permissions


class IsAppointmentOwner(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el doctor de la cita.
    """

    def has_object_permission(self, request, view, obj):
        doctor = getattr(request.user, "doctor", None)

        if isinstance(obj, Appointment):
            return obj.doctor == doctor
        return False


class IsAppointmentPatient(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el paciente de la cita.
    También permite el acceso a usuarios que pertenezcan al grupo Administrativo y Médico.
    """

    def has_object_permission(self, request, view, obj):
        if is_administrator(request.user) or is_doctor(request.user):
            return True

        if is_patient(request.user):
            patient = getattr(request.user, "patient", None)

            if isinstance(obj, Appointment):
                return obj.patient == patient

        return False
