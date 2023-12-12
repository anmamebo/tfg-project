from apps.doctors.api.permissions.doctor_permissions import IsSelfDoctor
from apps.doctors.api.serializers.doctor_serializer import (
    CreateDoctorSerializer,
    DoctorInDepartmentListSerializer,
    DoctorSerializer,
)
from apps.doctors.models import Doctor
from apps.users.api.serializers.user_serializer import UserSerializer
from config.permissions import IsAdministrator, IsAdministratorOrDoctor
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.doctor_username_generator import generate_doctor_username
from utilities.email_utils import send_welcome_email
from utilities.password_generator import generate_password
from utilities.permissions_helper import method_permission_classes


class DoctorViewSet(viewsets.GenericViewSet):
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

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de médicos.
        """
        doctors = self.get_queryset()

        doctors = self.filter_state_doctors(
            doctors
        )  # Filtra los médicos por estado (activos / no activos)
        doctors = self.filter_doctors(doctors)  # Filtra los médicos
        doctors = self.order_doctors(doctors)  # Ordena los médicos

        page = self.paginate_queryset(doctors)
        if page is not None:
            doctors_serializer = self.list_serializer_class(page, many=True)
            return self.get_paginated_response(doctors_serializer.data)

        doctors_serializer = self.list_serializer_class(doctors, many=True)
        return Response(doctors_serializer.data, status=status.HTTP_200_OK)

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
            return Response(
                {"message": "No se ha enviado los datos del usuario"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        request.data["user"]["password"] = generate_password()
        request.data["user"]["username"] = generate_doctor_username(
            request.data["user"]["name"], request.data["user"]["last_name"]
        )

        doctor_serializer = CreateDoctorSerializer(data=request.data)
        if doctor_serializer.is_valid():
            doctor = doctor_serializer.save()

            if not send_welcome_email(doctor.user, request.data["user"]["password"]):
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

        return Response(
            {
                "message": "Hay errores en la creación",
                "errors": doctor_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
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
                return Response(
                    {
                        "message": "Hay errores en la actualización",
                        "errors": user_serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
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

        return Response(
            {
                "message": "Hay errores en la actualización",
                "errors": doctor_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
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
            return Response(
                {"message": "No se ha encontrado el médico."},
                status=status.HTTP_400_BAD_REQUEST,
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
            return Response(
                {"message": "No se ha encontrado el médico."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = doctor.user
        if user:
            doctor.state = True
            doctor.is_available = True
            doctor.save()
            user.is_active = True
            user.save()

            return Response(
                {"message": "Médico activado correctamente."}, status=status.HTTP_200_OK
            )

    @method_permission_classes([IsAdministratorOrDoctor])
    @action(detail=False, methods=["get"])
    def doctors_by_department(self, request):
        """
        Lista todos los médicos por departamento.

        Permisos requeridos:
            - El usuario debe ser administrador o médico.

        Parámetros:
            department (string): El id del departamento.

        Parámetros opcionales:
            search (str): Una cadena de texto para buscar médicos.
            paginate (bool): Indica si se desea paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de médicos.
        """
        doctors = self.get_queryset()

        department_id = self.request.query_params.get("department", None)
        if not department_id:
            return Response(
                {"message": "No se ha enviado el departamento"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        doctors = doctors.filter(
            departments__id=department_id
        )  # Filtra los médicos por departamento
        doctors = self.filter_doctors(doctors)  # Filtra los médicos

        paginate = self.request.query_params.get("paginate", None)
        if paginate and paginate == "true":
            page = self.paginate_queryset(doctors)
            if page is not None:
                doctors_serializer = DoctorInDepartmentListSerializer(page, many=True)
                return self.get_paginated_response(doctors_serializer.data)

        doctors_serializer = DoctorInDepartmentListSerializer(doctors, many=True)
        return Response(doctors_serializer.data, status=status.HTTP_200_OK)

    def filter_doctors(self, doctors):
        """
        Filtra los médicos por búsqueda.

        Args:
            doctors (QuerySet): El conjunto de médicos.

        Returns:
            QuerySet: El conjunto de médicos filtrados.
        """
        query = self.request.query_params.get("search", None)
        if query:
            doctors = doctors.filter(
                Q(user__name__icontains=query)
                | Q(user__last_name__icontains=query)
                | Q(user__email__icontains=query)
                | Q(collegiate_number__icontains=query)
            )

        return doctors

    def order_doctors(self, doctors):
        """
        Ordena los médicos.

        Args:
            doctors (QuerySet): El conjunto de médicos.

        Returns:
            QuerySet: El conjunto de médicos ordenados.
        """
        ordering = self.request.query_params.get("ordering", None)
        if ordering:
            doctors = doctors.order_by(ordering)

        return doctors

    def filter_state_doctors(self, doctors):
        """
        Filtra los médicos por estado (activos / no activos).

        Args:
            doctors (QuerySet): El conjunto de médicos.

        Returns:
            QuerySet: El conjunto de médicos filtrados.
        """
        state = self.request.query_params.get("state", None)
        if state in ["true", "false"]:
            state_boolean = state == "true"
            doctors = doctors.filter(state=state_boolean)

        return doctors
