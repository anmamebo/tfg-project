import os

from apps.users.api.permissions.user_permissions import IsUserOwner
from apps.users.api.serializers.user_serializer import (
    PasswordSerializer,
    UpdateUserSerializer,
    UserListSerializer,
    UserProfilePictureSerializer,
    UserSerializer,
)
from apps.users.models import User
from config.permissions import IsAdministrator, IsAdministratorOrDoctorOrPatient
from django.db.models import Q
from django.shortcuts import get_object_or_404
from mixins.error_mixin import ErrorResponseMixin
from mixins.pagination_mixin import PaginationMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class UserViewSet(viewsets.GenericViewSet, ErrorResponseMixin, PaginationMixin):
    """
    Vista para gestionar usuarios.

    Esta vista permite realizar operaciones CRUD para usuarios.

    Attributes:
        model (Model): El modelo de usuario a gestionar.
        serializer_class (Serializer): El serializador para representar los datos del usuario.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de usuarios.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.

    Permissions:
        Se requieren permisos específicos para realizar diferentes acciones en la vista.
    """

    model = User
    serializer_class = UserSerializer
    list_serializer_class = UserListSerializer
    queryset = None

    # Recupera el objeto basado en el identificador en la URL
    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    # Define el conjunto de datos que se utilizará para las consultas
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all().order_by("-id")
        return self.queryset

    # detail=True si es para un solo objeto, detail=False si es para todos los objetos
    # si se usa url_path se debe especificar la url completa
    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    @action(detail=False, methods=["post"], url_path="set-password")
    def set_password(self, request):
        """
        Establece una nueva contraseña para el usuario.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del usuario.

        Returns:
            Response: La respuesta que indica si se ha actualizado la contraseña con éxito o si ha habido errores.
        """
        user = self.request.user
        password_serializer = PasswordSerializer(
            data=request.data, context={"request": request}
        )
        if password_serializer.is_valid():
            user.set_password(password_serializer.validated_data["password"])
            user.save()
            return Response({"message": "Contraseña actualizada correctamente"})

        return self.error_response(
            message="Hay errores en la actualización",
            errors=password_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministrator])
    def list(self, request):
        """
        Lista todos los usuarios disponibles.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Parámetros opcionales:
            state (bool): El estado de los pacientes a listar.
            search (str): Una cadena de texto para buscar pacientes.
            ordering (str): El campo por el que se ordenarán los pacientes.
            paginate (bool): Indica si se desea paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de usuarios o un mensaje de error si no tiene permisos.
        """
        users = self.get_queryset()

        users = self.filter_and_order_users(users)

        return self.conditional_paginated_response(users, self.list_serializer_class)

    @method_permission_classes([IsAdministrator])
    def create(self, request):
        """
        Crea un nuevo usuario.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que indica si el usuario se ha registrado correctamente o si ha habido errores.
        """
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            return Response(
                {
                    "message": "Usuario registrado correctamente.",
                },
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Hay errores en el registro",
            errors=user_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsUserOwner])
    def retrieve(self, request, pk=None):
        """
        Recupera los detalles de un usuario específico.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el dueño del usuario (en el caso de paciente y de médico).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del usuario.

        Returns:
            Response: La respuesta que contiene los detalles del usuario o un mensaje de error si no tiene permisos.
        """
        user = self.get_object(pk)
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsUserOwner])
    def update(self, request, pk=None):
        """
        Actualiza los detalles de un usuario existente.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el dueño del usuario (en el caso de paciente y de médico).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del usuario.

        Returns:
            Response: La respuesta que indica si el usuario se ha actualizado correctamente o si ha habido errores.
        """
        user = self.get_object(pk)
        user_serializer = UpdateUserSerializer(user, data=request.data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(
                {"message": "Usuario actualizado correctamente"},
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="Hay errores en la actualización",
            errors=user_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministrator])
    def destroy(self, request, pk=None):
        """
        Elimina un usuario existente.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del usuario a eliminar.

        Returns:
            Response: La respuesta que indica si el usuario se ha eliminado correctamente o si ha habido errores.

        """
        user_destroy = self.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:  # Verifica si se eliminó el usuario
            return Response({"message": "Usuario eliminado correctamente"})

        return self.error_response(
            message="No existe el usuario que desea eliminar",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsUserOwner])
    @action(detail=False, methods=["get", "put", "delete"], url_path="profile-picture")
    def profile_picture(self, request):
        """
        Recupera, actualiza o elimina la foto de perfil de un usuario existente.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el dueño del usuario (en el caso de paciente y de médico).

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la foto de perfil del usuario o un mensaje de error si no tiene permisos.
        """
        user = self.get_object(request.user.id)

        if request.method == "GET":
            serializer = UserProfilePictureSerializer(user)
            return Response(serializer.data)

        elif request.method == "PUT":
            return self.update_profile_picture(request, user)

        elif request.method == "DELETE":
            return self.delete_profile_picture(request, user)

        else:
            return self.error_response(
                message="Método HTTP no permitido",
                status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            )

    def update_profile_picture(self, request, user):
        """
        Actualiza la foto de perfil de un usuario existente.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el dueño del usuario (en el caso de paciente y de médico).

        Args:
            request (Request): La solicitud HTTP.
            user (User): El usuario.

        Returns:
            Response: La respuesta que indica si la foto de perfil se ha actualizado correctamente o si ha habido errores.
        """
        image_path = None
        if user.profile_picture:
            image_path = user.profile_picture.path

        user_serializer = UpdateUserSerializer(user, data=request.data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()

            if image_path and os.path.exists(image_path):
                os.remove(image_path)

            return Response(
                {
                    "profile_picture_url": user_serializer.data["profile_picture"],
                    "message": "Foto de perfil actualizada correctamente",
                },
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="Hay errores en la actualización",
            errors=user_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    def delete_profile_picture(self, request, user):
        """
        Elimina la foto de perfil de un usuario existente.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el dueño del usuario (en el caso de paciente y de médico).

        Args:
            request (Request): La solicitud HTTP.
            user (User): El usuario.

        Returns:
            Response: La respuesta que indica si la foto de perfil se ha eliminado correctamente o si ha habido errores.
        """
        user = self.get_object(request.user.id)
        if user.profile_picture:
            image_path = user.profile_picture.path
            user.profile_picture.delete(save=False)
            user.save()

            if os.path.exists(image_path):
                os.remove(image_path)

            return Response(
                {"message": "Foto de perfil eliminada correctamente"},
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="El usuario no tiene foto de perfil",
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    def filter_and_order_users(self, users):
        """
        Filtra y ordena los usuarios.

        Args:
            users (QuerySet): El conjunto de usuarios.

        Returns:
            QuerySet: El conjunto de usuarios filtrados y ordenados.
        """
        query = self.request.query_params.get("search", None)
        ordering = self.request.query_params.get("ordering", None)
        state = self.request.query_params.get("state", None)

        if query:
            users = users.filter(
                Q(id__icontains=query)
                | Q(name__icontains=query)
                | Q(last_name__icontains=query)
                | Q(email__icontains=query)
                | Q(username__icontains=query)
            )

        if ordering:
            users = users.order_by(ordering)

        if state in ["true", "false"]:
            state_boolean = state == "true"
            users = users.filter(is_active=state_boolean)

        return users
