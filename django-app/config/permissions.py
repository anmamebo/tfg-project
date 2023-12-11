from rest_framework import permissions

ADMINISTRATOR_GROUP_NAME = "Administrativo"
DOCTOR_GROUP_NAME = "Médico"
PATIENT_GROUP_NAME = "Paciente"


def is_in_group(user, group_name):
    """
    Verifica si el usuario pertenece a un grupo
    """
    return user.groups.filter(name=group_name).exists()


def is_administrator(user):
    """
    Verifica si el usuario pertenece al grupo Administrativo
    """
    return is_in_group(user, ADMINISTRATOR_GROUP_NAME)


def is_doctor(user):
    """
    Verifica si el usuario pertenece al grupo Médico
    """
    return is_in_group(user, DOCTOR_GROUP_NAME) and hasattr(user, "doctor")


def is_patient(user):
    """
    Verifica si el usuario pertenece al grupo Paciente
    """
    return is_in_group(user, PATIENT_GROUP_NAME) and hasattr(user, "patient")


class IsAdministrator(permissions.BasePermission):
    """
    Permite el acceso a usuarios que pertenezcan al grupo Administrativo
    """

    def has_permission(self, request, view):
        return is_administrator(request.user)


class IsDoctor(permissions.BasePermission):
    """
    Permite el acceso a usuarios que pertenezcan al grupo Médico
    """

    def has_permission(self, request, view):
        return is_doctor(request.user)


class IsPatient(permissions.BasePermission):
    """
    Permite el acceso a usuarios que pertenezcan al grupo Paciente
    """

    def has_permission(self, request, view):
        return is_patient(request.user)


class IsAdministratorOrDoctor(permissions.BasePermission):
    """
    Permite el acceso a usuarios que pertenezcan al grupo Administrativo o Médico
    """

    def has_permission(self, request, view):
        return is_administrator(request.user) or is_doctor(request.user)


class IsAdministratorOrPatient(permissions.BasePermission):
    """
    Permite el acceso a usuarios que pertenezcan al grupo Administrativo o Paciente
    """

    def has_permission(self, request, view):
        return is_administrator(request.user) or is_patient(request.user)


class IsDoctorOrPatient(permissions.BasePermission):
    """
    Permite el acceso a usuarios que pertenezcan al grupo Médico o Paciente
    """

    def has_permission(self, request, view):
        return is_doctor(request.user) or is_patient(request.user)


class IsAdministratorOrDoctorOrPatient(permissions.BasePermission):
    """
    Permite el acceso a usuarios que pertenezcan al grupo Administrativo o Médico o Paciente
    """

    def has_permission(self, request, view):
        return (
            is_administrator(request.user)
            or is_doctor(request.user)
            or is_patient(request.user)
        )
