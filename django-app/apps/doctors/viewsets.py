from apps.doctors.models import Doctor
from apps.doctors.permissions import IsSelfDoctor
from apps.doctors.serializers import (
    CreateDoctorSerializer,
    DoctorInDepartmentListSerializer,
    DoctorSerializer,
)
from apps.users.serializers import UserSerializer
from config.permissions import IsAdministrator, IsAdministratorOrDoctor
from django.db.models import Q
from django.shortcuts import get_object_or_404
from mixins.error_mixin import ErrorResponseMixin
from mixins.pagination_mixin import PaginationMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.doctor_username_generator import generate_doctor_username
from utilities.email_utils import EmailService
from utilities.password_generator import generate_password
from utilities.permissions_helper import method_permission_classes

email_service = EmailService()


class DoctorViewSet(viewsets.GenericViewSet, PaginationMixin, ErrorResponseMixin):
    """
    Vista para gestionar médicos.

    Esta vista permite realizar operaciones CRUD para médicos.

    Attributes:
        model (Model): El modelo de médico a gestionar.
        serializer_class (Serializer): El serializador para representar los datos del médico.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de médicos.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
    """

    model = Doctor
    serializer_class = DoctorSerializer
    list_serializer_class = DoctorSerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all().order_by("-created_date")
        return self.queryset

    @method_permission_classes([IsAdministratorOrDoctor])
    def list(self, request):
        """
        Lista todos los médicos.

        Permisos requeridos:
            - El usuario debe ser administrador o médico.

        Parámetros opcionales:
            state (bool): El estado de los médicos a listar.
            search (str): Una cadena de texto para buscar médicos.
            ordering (str): El campo por el que se ordenarán los médicos.
            paginate (bool): Indica si se desea paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de médicos.
        """
        doctors = self.get_queryset()

        doctors = self.filter_and_order_doctors(doctors)

        return self.conditional_paginated_response(doctors, self.list_serializer_class)

    @method_permission_classes([IsAdministrator])
    def create(self, request):
        """
        Crea un nuevo médico con usuario y contraseña generados automáticamente.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene el resultado de la creación.
        """
        if (
            "user" not in request.data
            or "name" not in request.data["user"]
            or "last_name" not in request.data["user"]
        ):
            return self.error_response(
                message="No se ha enviado los datos del usuario",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        request.data["user"]["password"] = generate_password()
        request.data["user"]["username"] = generate_doctor_username(
            request.data["user"]["name"], request.data["user"]["last_name"]
        )

        doctor_serializer = CreateDoctorSerializer(data=request.data)
        if doctor_serializer.is_valid():
            doctor = doctor_serializer.save()

            if not email_service.send_welcome_email(
                doctor.user, request.data["user"]["password"]
            ):
                return Response(
                    {
                        "message": "Médico creado correctamente pero no se ha podido enviar el correo electrónico."
                    },
                    status=status.HTTP_201_CREATED,
                )

            return Response(
                {"message": "Médico creado correctamente."},
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Hay errores en la creación.",
            errors=doctor_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctor, IsSelfDoctor])
    def retrieve(self, request, pk=None):
        """
        Recupera un médico.

        Permisos requeridos:
            - El usuario debe ser administrador o médico.
            - El usuario debe ser el mismo médico (en el caso de ser médico).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del médico.

        Returns:
            Response: La respuesta que contiene el médico.
        """
        doctor = self.get_object(pk)
        doctor_serializer = self.serializer_class(doctor)
        return Response(doctor_serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsAdministratorOrDoctor, IsSelfDoctor])
    def update(self, request, pk=None):
        """
        Actualiza un médico, primero actualiza los datos del usuario
        y luego los datos del médico, también actualiza los departamentos
        y especialidades médicas del médico.

        Permisos requeridos:
            - El usuario debe ser administrador o médico.
            - El usuario debe ser el mismo médico (en el caso de ser médico).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del médico.

        Returns:
            Response: La respuesta que contiene el resultado de la actualización.
        """
        doctor = self.get_object(pk)

        user_data = request.data.pop("user", None)
        if user_data:
            user_serializer = UserSerializer(doctor.user, data=user_data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
            else:
                return self.error_response(
                    message="Hay errores en la actualización.",
                    errors=user_serializer.errors,
                    status_code=status.HTTP_400_BAD_REQUEST,
                )

        # Actualiza los datos del doctor
        doctor_serializer = self.serializer_class(
            doctor, data=request.data, context={"request": request}, partial=True
        )
        if doctor_serializer.is_valid():
            doctor_serializer.save()

            departments = request.data.get("departments", None)
            medical_specialties = request.data.get("medical_specialties", None)

            if departments is not None:
                doctor.departments.set(departments)

            if medical_specialties is not None:
                doctor.medical_specialties.set(medical_specialties)

            return Response(
                {"message": "Médico actualizado correctamente"},
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="Hay errores en la actualización.",
            errors=doctor_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministrator])
    def destroy(self, request, pk=None):
        """
        Elimina un médico cambiando su estado a False.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del médico.

        Returns:
            Response: La respuesta que contiene el resultado de la eliminación.
        """
        doctor = self.get_queryset().filter(id=pk).first()
        if not doctor:
            return self.error_response(
                message="No se ha encontrado el médico.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        user = doctor.user
        if user:
            doctor.state = False
            doctor.is_available = False
            doctor.save()
            user.is_active = False
            user.save()

            return Response(
                {"message": "Médico eliminado correctamente."},
                status=status.HTTP_200_OK,
            )

    @method_permission_classes([IsAdministrator])
    @action(detail=True, methods=["put"])
    def activate(self, request, pk=None):
        """
        Activa un médico cambiando su estado a True.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del médico.

        Returns:
            Response: La respuesta que contiene el resultado de la activación.
        """
        doctor = self.get_object(pk)
        if not doctor:
            return self.error_response(
                message="No se ha encontrado el médico.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        user = doctor.user
        if user:
            doctor.state = True
            doctor.is_available = True
            doctor.save()
            user.is_active = True
            user.save()

            if not email_service.send_success_account_activation_email(user):
                return Response(
                    {
                        "message": "Médico activado correctamente pero no se ha podido enviar el correo electrónico.",
                    },
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"message": "Médico activado correctamente."}, status=status.HTTP_200_OK
            )

    @method_permission_classes([IsAdministratorOrDoctor])
    @action(detail=False, methods=["get"], url_path="department")
    def doctors_by_department(self, request):
        """
        Lista todos los médicos por departamento.

        Permisos requeridos:
            - El usuario debe ser administrador o médico.

        Parámetros:
            department (string): El id del departamento.

        Parámetros opcionales:
            ordering (string): El campo por el que se ordenarán los médicos.
            search (str): Una cadena de texto para buscar médicos.
            state (bool): El estado de los médicos a listar.
            paginate (bool): Indica si se desea paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de médicos.
        """
        doctors = self.get_queryset().filter(state=True)

        department_id = self.request.query_params.get("department", None)
        if not department_id:
            return self.error_response(
                message="No se ha enviado el departamento",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        doctors = doctors.filter(
            departments__id=department_id
        )  # Filtra los médicos por departamento
        doctors = self.filter_and_order_doctors(doctors)

        return self.conditional_paginated_response(
            doctors, DoctorInDepartmentListSerializer
        )

    def filter_and_order_doctors(self, doctors):
        """
        Filtra y ordena los médicos.

        Args:
            doctors (QuerySet): El conjunto de médicos.

        Returns:
            QuerySet: El conjunto de médicos filtrados y ordenados.
        """
        query = self.request.query_params.get("search", None)
        ordering = self.request.query_params.get("ordering", None)
        state = self.request.query_params.get("state", None)

        if query:
            doctors = doctors.filter(
                Q(id__icontains=query)
                | Q(user__id__icontains=query)
                | Q(user__name__icontains=query)
                | Q(user__last_name__icontains=query)
                | Q(user__email__icontains=query)
                | Q(collegiate_number__icontains=query)
            )

        if ordering:
            doctors = doctors.order_by(ordering)

        if state in ["true", "false"]:
            state_boolean = state == "true"
            doctors = doctors.filter(state=state_boolean)

        return doctors
