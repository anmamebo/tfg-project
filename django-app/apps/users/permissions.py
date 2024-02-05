from apps.users.models import User
from config.permissions import is_doctor, is_patient
from rest_framework import permissions


class IsUserOwner(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el dueño del usuario.
    """

    def has_object_permission(self, request, view, obj):

        if is_doctor(request.user) or is_patient(request.user):

            return isinstance(obj, User) and obj == request.user

        return True
