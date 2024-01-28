from apps.patients.models import Patient
from apps.patients.permissions import IsSelfPatient
from apps.patients.serializers import CreatePatientSerializer, PatientSerializer
from apps.users.serializers import UserSerializer
from config.permissions import (
    IsAdministrator,
    IsAdministratorOrDoctor,
    IsAdministratorOrDoctorOrPatient,
)
from django.db.models import Q
from django.shortcuts import get_object_or_404
from mixins.error_mixin import ErrorResponseMixin
from mixins.pagination_mixin import PaginationMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.email_utils import send_welcome_email
from utilities.password_generator import generate_password
from utilities.permissions_helper import method_permission_classes


class PatientViewSet(viewsets.GenericViewSet, PaginationMixin, ErrorResponseMixin):
    """
    Vista para gestionar pacientes.

    Esta vista permite realizar operaciones CRUD para pacientes.

    Attributes:
        model (Model): El modelo de paciente a gestionar.
        serializer_class (Serializer): El serializador para representar los datos del paciente.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de pacientes.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
    """

    model = Patient
    serializer_class = PatientSerializer
    list_serializer_class = PatientSerializer
    queryset = None

    # Recupera el objeto basado en el identificador en la URL
    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    # Define el conjunto de datos que se utilizará para las consultas
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all().order_by("-created_date")
        return self.queryset

    @method_permission_classes([IsAdministratorOrDoctor])
    def list(self, request):
        """
        Lista todos los pacientes.

        Permisos requeridos:
            - El usuario debe ser administrador o doctor.

        Parámetros opcionales:
            state (bool): El estado de los pacientes a listar.
            search (str): Una cadena de texto para buscar pacientes.
            ordering (str): El campo por el que se ordenarán los pacientes.
            paginate (bool): Indica si se desea paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de pacientes.
        """
        patients = self.get_queryset()

        patients = self.filter_and_order_patients(patients)

        return self.conditional_paginated_response(patients, self.list_serializer_class)

    @method_permission_classes([IsAdministratorOrDoctor])
    def create(self, request):
        """
        Crea un nuevo paciente con usuario y contraseña generados automáticamente.

        Permisos requeridos:
            - El usuario debe ser administrador o doctor.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que indica si el paciente se ha creado correctamente o si ha habido errores.
        """
        if "user" not in request.data or "dni" not in request.data:
            return self.error_response(
                message="No se ha enviado los datos del paciente",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        request.data["user"]["password"] = generate_password()
        request.data["user"]["username"] = request.data["dni"]

        patient_serializer = CreatePatientSerializer(data=request.data)
        if patient_serializer.is_valid():
            patient = patient_serializer.save()

            if not send_welcome_email(patient.user, request.data["user"]["password"]):
                return Response(
                    {
                        "message": "Paciente creado correctamente pero no se ha podido enviar el correo electrónico.",
                    },
                    status=status.HTTP_201_CREATED,
                )

            return Response(
                {"message": "Paciente creado correctamente."},
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Hay errores en la creación.",
            errors=patient_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsSelfPatient])
    def retrieve(self, request, pk=None):
        """
        Recupera los detalles de un paciente específico.

        Permisos requeridos:
            - El usuario debe ser administrador, doctor o paciente.
            - El usuario debe ser el paciente que se está consultando (en el caso de paciente).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del paciente.

        Returns:
            Response: La respuesta que contiene los detalles del paciente o un mensaje de error si no tiene permisos.
        """
        patient = self.get_object(pk)
        patient_serializer = self.serializer_class(patient)
        return Response(patient_serializer.data)

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsSelfPatient])
    def update(self, request, pk=None):
        """
        Actualiza los detalles de un paciente existente, primero actualiza los datos del usuario
        y luego los del paciente.

        Permisos requeridos:
            - El usuario debe ser administrador, doctor o paciente.
            - El usuario debe ser el paciente que se está consultando (en el caso de paciente).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del paciente.

        Returns:
            Response: La respuesta que indica si el paciente se ha actualizado correctamente o si ha habido errores.
        """
        patient = self.get_object(pk)

        # Actualiza los datos del usuario en caso de que se hayan enviado
        user_data = request.data.pop("user", None)
        if user_data:
            user_serializer = UserSerializer(patient.user, data=user_data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
            else:
                return self.error_response(
                    message="Hay errores en la actualización.",
                    errors=user_serializer.errors,
                    status_code=status.HTTP_400_BAD_REQUEST,
                )

        # Actualiza los datos del paciente
        patient_serializer = self.serializer_class(
            patient, data=request.data, context={"request": request}, partial=True
        )
        if patient_serializer.is_valid():
            patient_serializer.save()
            return Response(
                {"message": "Paciente actualizado correctamente"},
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="Hay errores en la actualización.",
            errors=patient_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministrator])
    def destroy(self, request, pk=None):
        """
        Elimina un paciente cambiando su estado a False.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del paciente.

        Returns:
            Response: La respuesta que indica si el paciente se ha eliminado correctamente o si ha habido errores.
        """
        patient = self.get_queryset().filter(id=pk).first()
        if not patient:
            return self.error_response(
                message="No se ha encontrado el paciente.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        user = patient.user
        if user:
            patient.state = False
            patient.save()
            user.is_active = False
            user.save()

            address = patient.address
            if address:
                address.state = False
                address.save()

            return Response(
                {"message": "Paciente eliminado correctamente."},
                status=status.HTTP_200_OK,
            )

    @method_permission_classes([IsAdministrator])
    @action(detail=True, methods=["put"])
    def activate(self, request, pk=None):
        """
        Activa un paciente cambiando su estado a True.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID del paciente.

        Returns:
            Response: La respuesta que indica si el paciente se ha activado correctamente o si ha habido errores.
        """
        patient = self.get_object(pk)
        if not patient:
            return self.error_response(
                message="No se ha encontrado el paciente.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        user = patient.user
        if user:
            patient.state = True
            patient.save()
            user.is_active = True
            user.save()

            address = patient.address
            if address:
                address.state = True
                address.save()

            return Response(
                {"message": "Paciente eliminado correctamente."},
                status=status.HTTP_200_OK,
            )

    def filter_and_order_patients(self, patients):
        """
        Filtra y ordena los pacientes.

        Args:
            patients (QuerySet): El conjunto de pacientes.

        Returns:
            QuerySet: El conjunto de pacientes filtrados y ordenados.
        """
        query = self.request.query_params.get("search", None)
        ordering = self.request.query_params.get("ordering", None)
        state = self.request.query_params.get("state", None)

        if query:
            patients = patients.filter(
                Q(id__icontains=query)
                | Q(user__id__icontains=query)
                | Q(user__name__icontains=query)
                | Q(user__last_name__icontains=query)
                | Q(dni__icontains=query)
                | Q(user__email__icontains=query)
                | Q(social_security__icontains=query)
                | Q(phone__icontains=query)
            )

        if ordering:
            patients = patients.order_by(ordering)

        if state in ["true", "false"]:
            state_boolean = state == "true"
            patients = patients.filter(state=state_boolean)

        return patients
