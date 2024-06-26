import os
from datetime import datetime

from apps.patients.serializers import CreatePatientSerializer
from apps.users.models import User
from apps.users.serializers import (
    CustomTokenObtainPairSerializer,
    CustomUserSerializer,
    EmptySerializer,
)
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from mixins.error_mixin import ErrorResponseMixin
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from utilities.email_utils import EmailService

email_service = EmailService()


class Login(TokenObtainPairView, ErrorResponseMixin):
    """
    Vista para iniciar sesión y obtener tokens de acceso.

    Esta vista permite a los usuarios autenticarse y obtener tokens de acceso y de actualización
    para su uso posterior en las solicitudes autenticadas.

    Attributes:
        serializer_class (Serializer): El serializador para representar los datos de inicio de sesión.

    Permissions:
        No se requieren permisos específicos para acceder a esta vista.
    """

    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        """
        Inicia sesión y obtiene tokens de acceso y de actualización.

        Args:
            request (Request): La solicitud HTTP que contiene el nombre de usuario y contraseña para la autenticación.

        Returns:
            Response: La respuesta que contiene los tokens de acceso y de actualización y los datos del usuario o los errores.
        """
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(
            username=username, password=password
        )  # authenticate retorna el usuario si la autenticación es exitosa, de lo contrario retorna None

        if user:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                user.last_login = datetime.now()
                user.save(update_fields=["last_login"])

                user_serializer = CustomUserSerializer(user)
                return Response(
                    {
                        "token": login_serializer.validated_data.get("access"),
                        "refresh_token": login_serializer.validated_data.get("refresh"),
                        "user": user_serializer.data,
                        "message": "Inicio de sesión exitoso",
                    },
                    status=status.HTTP_200_OK,
                )

        return self.error_response(
            message="Contraseña o nombre de usuario incorrectos",
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class Signup(GenericAPIView, ErrorResponseMixin):
    """
    Vista para registrar un nuevo usuario.

    Esta vista permite a los usuarios registrarse en la aplicación.

    Attributes:
        No se requieren atributos específicos para esta vista.
    """

    serializer_class = CreatePatientSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        if "user" not in request.data or "dni" not in request.data:
            return self.error_response(
                message="Datos incompletos", status_code=status.HTTP_400_BAD_REQUEST
            )

        request.data["user"]["username"] = request.data["dni"]
        request.data["user"]["is_active"] = False
        request.data["state"] = False

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            patient = serializer.save()

            if not email_service.send_welcome_signup_email(patient.user):
                return Response(
                    {
                        "message": "Usuario creado, pero no se pudo enviar el correo electrónico"
                    },
                    status=status.HTTP_201_CREATED,
                )

            return Response(
                {
                    "message": "Usuario creado, recibirá un correo cuando su cuenta sea activada"
                },
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Error al crear el usuario",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )


class Logout(GenericAPIView, ErrorResponseMixin):
    """
    Vista para cerrar sesión y revocar tokens de acceso.

    Esta vista permite a los usuarios cerrar sesión y revocar sus tokens de acceso, lo que impide que se realicen
    solicitudes autenticadas en su nombre.

    Attributes:
        No se requieren atributos específicos para esta vista.
    """

    serializer_class = EmptySerializer

    def post(self, request, *args, **kwargs):
        """
        Cierra sesión y revoca los tokens de acceso.

        Args:
            request (Request): La solicitud HTTP que contiene el ID del usuario para cerrar sesión.

        Returns:
            Response: La respuesta que indica sí la sesión se ha cerrado correctamente o si ha habido errores.
        """
        user = User.objects.filter(
            id=request.data.get("user", 0)
        )  # Recupera el usuario por su ID
        if user.exists():
            RefreshToken.for_user(
                user.first()
            )  # Revoca los tokens de acceso del usuario
            return Response(
                {"message": "Sesión cerrada correctamente"}, status=status.HTTP_200_OK
            )

        return self.error_response(
            message="No existe este usuario", status_code=status.HTTP_400_BAD_REQUEST
        )


class ForgetPassword(GenericAPIView, ErrorResponseMixin):
    """
    Vista para enviar un correo electrónico para restablecer la contraseña.

    Esta vista permite a los usuarios enviar un correo electrónico para restablecer su contraseña.

    Attributes:
        No se requieren atributos específicos para esta vista.
    """

    serializer_class = EmptySerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Envía un correo electrónico para restablecer la contraseña.

        Args:
            request (Request): La solicitud HTTP que contiene el correo electrónico del usuario para restablecer la contraseña.

        Returns:
            Response: La respuesta que indica si el correo electrónico se ha enviado correctamente o si ha habido errores.
        """
        user = User.objects.filter(
            email=request.data.get("email", "")
        ).first()  # Recupera el usuario por su correo electrónico
        if not user:
            return self.error_response(
                message="Usuario no encontrado", status_code=status.HTTP_400_BAD_REQUEST
            )

        reset_token = default_token_generator.make_token(user)
        user.reset_password_token = reset_token
        user.save()

        if os.environ.get("DJANGO_ENV") == "PRODUCTION":
            frontend_url = os.environ.get("FRONTEND_URL")
            url = f"{frontend_url}/auth/restablecer-contrasena/{user.id}/{reset_token}"
        else:
            url = f"http://localhost:4200/auth/restablecer-contrasena/{user.id}/{reset_token}"

        if not email_service.send_reset_password_email(user, url):
            return self.error_response(
                message="Error al enviar el correo electrónico",
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {
                "message": "Se ha enviado un correo electrónico para restablecer la contraseña"
            },
            status=status.HTTP_200_OK,
        )


class ResetPassword(GenericAPIView, ErrorResponseMixin):
    """
    Vista para restablecer la contraseña.

    Esta vista permite a los usuarios restablecer su contraseña.

    Attributes:
        No se requieren atributos específicos para esta vista.
    """

    serializer_class = EmptySerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Restablece la contraseña.

        Args:
            request (Request): La solicitud HTTP que contiene el ID del usuario y el token para restablecer la contraseña.

        Returns:
            Response: La respuesta que indica si la contraseña se ha restablecido correctamente o si ha habido errores.
        """
        user_id = request.data.get("id", 0)
        token = request.data.get("token", "")
        password = request.data.get("password", "")

        user = User.objects.filter(id=user_id).first()

        if not user or not default_token_generator.check_token(user, token):
            return self.error_response(
                message="Token no valido o usuario no encontrado",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(password)
        user.reset_password_token = None
        user.save()

        if not email_service.send_success_password_reset_email(user):
            return self.error_response(
                message="Error al enviar el correo electrónico",
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"message": "Contraseña restablecida correctamente"},
            status=status.HTTP_200_OK,
        )
