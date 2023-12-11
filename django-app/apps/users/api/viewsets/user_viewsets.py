from apps.users.api.serializers.user_serializer import (
    PasswordSerializer,
    UpdateUserSerializer,
    UserListSerializer,
    UserSerializer,
)
from apps.users.models import User
from config.permissions import IsAdministrator, IsAdministratorOrDoctorOrPatient
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class UserViewSet(viewsets.GenericViewSet):
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
    permission_classes = (DjangoModelPermissions,)

    # Recupera el objeto basado en el identificador en la URL
    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    # Define el conjunto de datos que se utilizará para las consultas
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter(is_active=True).all()
        return self.queryset

    # detail=True si es para un solo objeto, detail=False si es para todos los objetos
    # si se usa url_path se debe especificar la url completa
    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    @action(detail=True, methods=["post"])
    def set_password(self, request, pk=None):
        """
        Establece una nueva contraseña para el usuario.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del usuario.

        Returns:
            Response: La respuesta que indica si se ha actualizado la contraseña con éxito o si ha habido errores.
        """
        user = self.get_object(pk)
        password_serializer = PasswordSerializer(
            data=request.data, context={"request": request}
        )
        if password_serializer.is_valid():
            user.set_password(password_serializer.validated_data["password"])
            user.save()
            return Response({"message": "Contraseña actualizada correctamente"})

        return Response(
            {
                "message": "Hay errores en la información enviada",
                "errors": password_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministrator])
    def list(self, request):
        """
        Lista todos los usuarios disponibles.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de usuarios o un mensaje de error si no tiene permisos.

        Permissions:
            - users.list_user: Permite listar usuarios.
        """
        if not request.user.has_perm("users.list_user"):
            return Response(
                {"detail": "No tiene permisos para listar usuarios"},
                status=status.HTTP_403_FORBIDDEN,
            )

        users = self.get_queryset()
        users_serializer = self.list_serializer_class(users, many=True)
        return Response(users_serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsAdministrator])
    def create(self, request):
        """
        Crea un nuevo usuario.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que indica si el usuario se ha registrado correctamente o si ha habido errores.

        Permissions:
            - users.add_user: Permite crear usuarios.
        """
        if not request.user.has_perm("users.add_user"):
            return Response(
                {"detail": "No tiene permisos para registrar usuarios"},
                status=status.HTTP_403_FORBIDDEN,
            )

        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            return Response(
                {
                    "message": "Usuario registrado correctamente.",
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {"message": "Hay errores en el registro", "errors": user_serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    def retrieve(self, request, pk=None):
        """
        Recupera los detalles de un usuario específico.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del usuario.

        Returns:
            Response: La respuesta que contiene los detalles del usuario o un mensaje de error si no tiene permisos.

        Permissions:
            - users.get_user: Permite ver un usuario.
        """
        if not request.user.has_perm("users.get_user"):
            return Response(
                {"detail": "No tiene permisos para ver este usuario"},
                status=status.HTTP_403_FORBIDDEN,
            )

        user = self.get_object(pk)
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)

    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    def update(self, request, pk=None):
        """
        Actualiza los detalles de un usuario existente.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del usuario.

        Returns:
            Response: La respuesta que indica si el usuario se ha actualizado correctamente o si ha habido errores.

        Permissions:
            - users.change_user: Permite actualizar un usuario.
        """
        if not request.user.has_perm("users.change_user"):
            return Response(
                {"detail": "No tiene permisos para actualizar este usuario"},
                status=status.HTTP_403_FORBIDDEN,
            )

        user = self.get_object(pk)
        user_serializer = UpdateUserSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(
                {"message": "Usuario actualizado correctamente"},
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "message": "Hay errores en la actualización",
                "errors": user_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministrator])
    def destroy(self, request, pk=None):
        """
        Elimina un usuario existente.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del usuario a eliminar.

        Returns:
            Response: La respuesta que indica si el usuario se ha eliminado correctamente o si ha habido errores.

        Permissions:
            - users.delete_user: Permite eliminar un usuario.
        """
        if not request.user.has_perm("users.delete_user"):
            return Response(
                {"detail": "No tiene permisos para eliminar este usuario"},
                status=status.HTTP_403_FORBIDDEN,
            )

        user_destroy = self.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:  # Verifica si se eliminó el usuario
            return Response({"message": "Usuario eliminado correctamente"})

        return Response(
            {"message": "No existe el usuario que desea eliminar"},
            status=status.HTTP_404_NOT_FOUND,
        )
