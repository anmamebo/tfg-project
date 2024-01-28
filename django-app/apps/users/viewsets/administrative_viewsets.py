from apps.users.models import User
from apps.users.serializers import (
    UpdateUserSerializer,
    UserListSerializer,
    UserSerializer,
)
from config.permissions import IsAdministrator
from django.contrib.auth.models import Group
from django.db.models import Q
from django.http import Http404
from django.shortcuts import get_object_or_404
from mixins.error_mixin import ErrorResponseMixin
from mixins.pagination_mixin import PaginationMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.email_utils import send_welcome_email
from utilities.password_generator import generate_password
from utilities.permissions_helper import method_permission_classes


class AdministrativeViewSet(
    viewsets.GenericViewSet, ErrorResponseMixin, PaginationMixin
):
    """
    Vista para gestionar usuarios administrativos.

    Esta vista permite realizar operaciones CRUD para usuarios administrativos.

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
    # def get_object(self, pk):
    #     return get_object_or_404(self.model, pk=pk)
    def get_object(self, pk):
        group_name = "Administrativo"
        try:
            group = Group.objects.get(name=group_name)
        except Group.DoesNotExist:
            raise Http404("El grupo 'Administrativo' no existe.")

        user = get_object_or_404(self.model, pk=pk, groups=group)

        return user

    # Define el conjunto de datos que se utilizará para las consultas
    def get_queryset(self):
        if self.queryset is None:
            group_name = "Administrativo"
            try:
                group = Group.objects.get(name=group_name)
                self.queryset = group.user_set.all()
                return self.queryset
            except Group.DoesNotExist:
                return self.model.objects.none()
        return self.queryset

    @method_permission_classes([IsAdministrator])
    def list(self, request):
        """
        Lista todos los usuarios administrativos.

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
        Crea un usuario administrativo.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene el usuario creado o un mensaje de error si no tiene permisos.
        """
        request.data["password"] = generate_password()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.groups.add(Group.objects.get(name="Administrativo"))
            user.is_staff = True
            user.is_superuser = True
            user.save()

            if not send_welcome_email(user, request.data["password"]):
                return Response(
                    {
                        "message": "Administrativo creado correctamente, pero no se pudo enviar el correo electrónico de bienvenida."
                    },
                    status=status.HTTP_201_CREATED,
                )

            return Response(
                {"message": "Administrativo creado correctamente."},
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Hay errores en la creación.",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministrator])
    def retrieve(self, request, pk=None):
        """
        Obtiene un usuario administrativo.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del usuario.

        Returns:
            Response: La respuesta que contiene el usuario o un mensaje de error si no tiene permisos.
        """
        user = self.get_object(pk)
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    @method_permission_classes([IsAdministrator])
    def update(self, request, pk=None):
        """
        Actualiza un usuario administrativo.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del usuario.

        Returns:
            Response: La respuesta que contiene el usuario actualizado o un mensaje de error si no tiene permisos.
        """
        user = self.get_object(pk)
        serializer = UpdateUserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Administrativo actualizado correctamente."},
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="Hay errores en la actualización.",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministrator])
    def destroy(self, request, pk=None):
        """
        Elimina un usuario administrativo.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del usuario.

        Returns:
            Response: La respuesta que indica si el usuario fue eliminado o un mensaje de error si no tiene permisos.
        """
        user = self.get_queryset().filter(id=pk).first()
        if not user:
            return self.error_response(
                message="El usuario no existe.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

        user.is_active = False
        user.save()

        return Response(
            {"message": "Administrativo eliminado correctamente."},
            status=status.HTTP_200_OK,
        )

    @method_permission_classes([IsAdministrator])
    @action(detail=True, methods=["put"])
    def activate(self, request, pk=None):
        """
        Activa un usuario administrativo.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del usuario.

        Returns:
            Response: La respuesta que indica si el usuario fue activado o un mensaje de error si no tiene permisos.
        """
        user = self.get_queryset().filter(id=pk).first()
        if not user:
            return self.error_response(
                message="El usuario no existe.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

        user.is_active = True
        user.save()

        return Response(
            {"message": "Administrativo activado correctamente."},
            status=status.HTTP_200_OK,
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
