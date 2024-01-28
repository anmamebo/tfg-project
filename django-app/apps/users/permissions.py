from apps.users.models import User
from config.permissions import is_administrator
from rest_framework import permissions


class IsUserOwner(permissions.BasePermission):
    """
    Verifica si el usuario que hace la petición es el dueño del usuario.
    También permite el acceso a usuarios que pertenezcan al grupo Administrativo.
    """

    def has_object_permission(self, request, view, obj):
        if is_administrator(request.user):
            return True

        if isinstance(obj, User):
            return obj == request.user

        return False
