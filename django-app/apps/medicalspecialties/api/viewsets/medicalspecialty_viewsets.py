from apps.medicalspecialties.api.serializers.medicalspecialty_serializer import (
    MedicalSpecialtySerializer,
)
from apps.medicalspecialties.models import MedicalSpecialty
from config.permissions import IsAdministrator, IsAdministratorOrDoctorOrPatient
from django.db.models import Q
from django.shortcuts import get_object_or_404
from mixins.error_mixin import ErrorResponseMixin
from mixins.pagination_mixin import PaginationMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class MedicalSpecialtyViewSet(
    viewsets.GenericViewSet, PaginationMixin, ErrorResponseMixin
):
    """
    Vista para gestionar especialidades médicas.

    Esta vista permite realizar operaciones CRUD para especialidades médicas.

    Attributes:
        model (Model): El modelo de especialidad médica a gestionar.
        serializer_class (Serializer): El serializador para representar los datos de la especialidad médica.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de especialidades médicas.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
    """

    model = MedicalSpecialty
    serializer_class = MedicalSpecialtySerializer
    list_serializer_class = MedicalSpecialtySerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all().order_by("-created_date")
        return self.queryset

    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    def list(self, request):
        """
        Lista todas las especialidades médicas.

        Permisos requeridos:
            - El usuario debe ser administrador, doctor o paciente.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de especialidades médicas.
        """
        medicalspecialties = self.get_queryset()

        medicalspecialties = self.filter_and_order_specialties(medicalspecialties)

        return self.conditional_paginated_response(
            medicalspecialties, self.list_serializer_class
        )

    @method_permission_classes([IsAdministrator])
    def create(self, request):
        """
        Crea una especialidad médica.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la especialidad médica creada.
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Especialidad médica creada correctamente."},
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Hay errores en la creación",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    def retrieve(self, request, pk=None):
        """
        Obtiene una especialidad médica.

        Permisos requeridos:
            - El usuario debe ser administrador, doctor o paciente.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la especialidad médica.

        Returns:
            Response: La respuesta que contiene la especialidad médica.
        """
        medical_specialty = self.get_object(pk)
        serializer = self.serializer_class(medical_specialty)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsAdministrator])
    def update(self, request, pk=None):
        """
        Actualiza una especialidad médica.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la especialidad médica.

        Returns:
            Response: La respuesta que contiene la especialidad médica actualizada.
        """
        medical_specialty = self.get_object(pk)
        serializer = self.serializer_class(
            medical_specialty, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Especialidad médica actualizada correctamente."},
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="Hay errores en la actualización",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministrator])
    def destroy(self, request, pk=None):
        """
        Elimina una especialidad médica.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la especialidad médica.

        Returns:
            Response: La respuesta que contiene el mensaje de éxito.
        """
        medical_specialty = self.get_queryset().filter(id=pk).first()
        if not medical_specialty:
            return self.error_response(
                message="No se encontró la especialidad médica.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

        medical_specialty.state = False
        medical_specialty.save()
        return Response(
            {"message": "Especialidad médica eliminada correctamente."},
            status=status.HTTP_200_OK,
        )

    @method_permission_classes([IsAdministrator])
    @action(detail=True, methods=["put"])
    def activate(self, request, pk=None):
        """
        Activa una especialidad médica.

        Permisos requeridos:
            - El usuario debe ser administrador.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador de la especialidad médica.

        Returns:
            Response: La respuesta que contiene el mensaje de éxito.
        """
        medical_specialty = self.get_queryset().filter(id=pk).first()
        if not medical_specialty:
            return self.error_response(
                message="No se encontró la especialidad médica.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

        medical_specialty.state = True
        medical_specialty.save()
        return Response(
            {"message": "Especialidad médica activada correctamente."},
            status=status.HTTP_200_OK,
        )

    def filter_and_order_specialties(self, medical_specialties):
        """
        Filtra y ordena las especialidades médicas.

        Args:
            medical_specialties (QuerySet): El conjunto de especialidades médicas.

        Returns:
            QuerySet: El conjunto de especialidades médicas filtradas y ordenadas.
        """
        query = self.request.query_params.get("search", None)
        ordering = self.request.query_params.get("ordering", None)
        state = self.request.query_params.get("state", None)

        if query:
            medical_specialties = medical_specialties.filter(
                Q(name__icontains=query) | Q(description__icontains=query)
            )

        if ordering:
            medical_specialties = medical_specialties.order_by(ordering)

        if state in ["true", "false"]:
            state_boolean = state == "true"
            medical_specialties = medical_specialties.filter(state=state_boolean)

        return medical_specialties
