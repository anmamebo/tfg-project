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

    def has_permission(self, request, view):
        if is_administrator(request.user) or is_doctor(request.user):
            return True

        appointment_id = request.query_params.get("appointment_id", None)
        if appointment_id:
            appointment = get_object_or_404(Appointment, pk=appointment_id)
            patient = getattr(request.user, "patient", None)
            return appointment.patient == patient

        return False
