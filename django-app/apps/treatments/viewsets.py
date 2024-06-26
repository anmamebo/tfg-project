from datetime import datetime, timedelta

from apps.appointments.models import Appointment
from apps.patients.models import Patient
from apps.treatments.mixins import GeneratePDFMixin
from apps.treatments.models import Treatment
from apps.treatments.permissions import (
    IsTreatmentDoctor,
    IsTreatmentPatient,
    IsTreatmentsPatient,
)
from apps.treatments.serializers import TreatmentListSerializer, TreatmentSerializer
from config.permissions import (
    IsAdministratorOrDoctor,
    IsAdministratorOrDoctorOrPatient,
    IsDoctor,
)
from django.db.models import Q
from django.shortcuts import get_object_or_404
from mixins.error_mixin import ErrorResponseMixin
from mixins.pagination_mixin import PaginationMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class TreatmentViewSet(
    viewsets.GenericViewSet, PaginationMixin, ErrorResponseMixin, GeneratePDFMixin
):
    """
    Vista para gestionar tratamientos.

    Esta vista permite realizar operaciones CRUD para tratamientos.

    Attributes:
        model (Model): El modelo de tratamiento a gestionar.
        serializer_class (Serializer): El serializador para representar los datos del tratamiento.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de tratamientos.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
    """

    model = Treatment
    serializer_class = TreatmentSerializer
    list_serializer_class = TreatmentListSerializer
    queryset = None
    status_transitions = {
        "in_progress": ["completed", "interrupted", "cancelled"],
        "completed": [],
        "interrupted": ["in_progress", "cancelled"],
        "cancelled": [],
    }

    # Recupera el objeto basado en el identificador en la URL
    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    # Define el conjunto de datos que se utilizará para las consultas
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all().order_by("-created_date")
        return self.queryset

    @method_permission_classes([IsDoctor])
    def create(self, request):
        """
        Crea un tratamiento.

        Permisos requeridos:
            - El usuario debe ser médico.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene los datos del tratamiento creado.
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Tratamiento creado correctamente.",
                },
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Ha ocurrido un error al crear el tratamiento.",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsTreatmentPatient])
    def retrieve(self, request, pk=None):
        """
        Recupera un tratamiento.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el paciente del tratamiento (en el caso de paciente).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del tratamiento.

        Returns:
            Response: La respuesta que contiene los datos del tratamiento.
        """
        treatment = self.get_object(pk)
        serializer = self.serializer_class(treatment)
        return Response(serializer.data)

    @method_permission_classes([IsDoctor, IsTreatmentDoctor])
    def update(self, request, pk=None):
        """
        Actualiza un tratamiento.

        Permisos requeridos:
            - El usuario debe ser médico.
            - El usuario debe ser el médico del tratamiento.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del tratamiento.

        Returns:
            Response: La respuesta que contiene los datos del tratamiento actualizado.
        """
        treatment = self.get_object(pk)
        serializer = self.serializer_class(treatment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Tratamiento actualizado correctamente.",
                },
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="Ha ocurrido un error al actualizar el tratamiento.",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsDoctor, IsTreatmentDoctor])
    def destroy(self, request, pk=None):
        """
        Elimina un tratamiento.

        Permisos requeridos:
            - El usuario debe ser médico.
            - El usuario debe ser el médico del tratamiento.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del tratamiento.

        Returns:
            Response: La respuesta que contiene el mensaje de éxito o error.
        """
        treatment = self.get_queryset().filter(id=pk).first()
        if not treatment:
            return self.error_response(
                message="El tratamiento no existe.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

        treatment.state = False
        treatment.save()

        return Response(
            {
                "message": "Tratamiento eliminado correctamente.",
            },
            status=status.HTTP_200_OK,
        )

    @method_permission_classes([IsAdministratorOrDoctor])
    @action(detail=False, methods=["get"], url_path="appointment")
    def list_for_appointment(self, request):
        """
        Lista todos los tratamientos de una cita.

        Permisos requeridos:
            - El usuario debe ser administrador o médico.

        Parámetros:
            appointment_id (str): El identificador de la cita.

        Parámetros opcionales:
            paginate (str): Indica si se debe paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de tratamientos.
        """
        appointment_id = self.request.query_params.get("appointment_id", None)

        if not appointment_id:
            return self.error_response(
                message="No se ha especificado el identificador de la cita.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        appointment = get_object_or_404(Appointment, pk=appointment_id)
        treatments = (
            self.get_queryset()
            .filter(appointment_id=appointment_id, state=True)
            .order_by("-start_date")
        )

        return self.conditional_paginated_response(
            treatments, self.list_serializer_class
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsTreatmentsPatient])
    @action(detail=False, methods=["get"], url_path="patient")
    def list_for_patient(self, request):
        """
        Lista todos los tratamientos de un paciente.

        Permisos requeridos:
            - El usuario debe ser administrador, paciente o médico.
            - El usuario debe ser el paciente de los tratamientos (en el caso de paciente).

        Parámetros opcionales:
            patient_id (str): El identificador del paciente.
            status (list): La lista de estados de los tratamientos.
            search (str): El texto a buscar en el nombre del tratamiento.
            ordering (str): El campo por el cual ordenar los resultados.
            paginate (str): Indica si se debe paginar los resultados.
            start_date__gte (str): La fecha de inicio mínima del tratamiento.
            start_date__lte (str): La fecha de inicio máxima del tratamiento.
            end_date__gte (str): La fecha de fin mínima del tratamiento.
            end_date__lte (str): La fecha de fin máxima del tratamiento.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de tratamientos.
        """
        if request.GET.get("patient_id", None):
            patient_id = request.GET.get("patient_id", None)
            patient = get_object_or_404(Patient, pk=patient_id)
        else:
            patient = getattr(request.user, "patient", None)

        treatments = (
            self.get_queryset()
            .filter(patient=patient, state=True)
            .order_by("start_date")
        )

        treatments = self.filter_treatments_by_statuses(treatments)
        treatments = self.filter_treatments_by_date_range(treatments, "start_date")
        treatments = self.filter_treatments_by_date_range(treatments, "end_date")
        treatments = self.filter_and_order_treatments(treatments)

        return self.conditional_paginated_response(
            treatments, self.list_serializer_class
        )

    @method_permission_classes(
        [IsAdministratorOrDoctorOrPatient, IsTreatmentDoctor, IsTreatmentPatient]
    )
    @action(detail=True, methods=["put"], url_path="status")
    def update_status(self, request, pk=None):
        """
        Actualiza el estado de un tratamiento, siempre y cuando
        la transición de estado sea válida.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el médico del tratamiento (en el caso de médico).
            - El usuario debe ser el paciente del tratamiento (en el caso de paciente).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del tratamiento.

        Returns:
            Response: La respuesta con el mensaje de éxito o error.
        """
        new_status = request.data.get("status", None)

        if not new_status:
            return self.error_response(
                message="No se ha especificado el estado.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        treatment = self.get_object(pk)
        current_status = treatment.status
        valid_transitions = self.status_transitions.get(current_status, [])

        if new_status not in valid_transitions:
            return self.error_response(
                message="El estado no es válido.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        if new_status == "completed":
            treatment.end_date = datetime.now()

        treatment.status = new_status
        treatment.save()

        return Response(
            {
                "message": "Estado actualizado correctamente.",
            },
            status=status.HTTP_200_OK,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsTreatmentPatient])
    @action(detail=True, methods=["get"], url_path="pdf")
    def get_treatment_pdf(self, request, pk=None):
        """
        Genera un PDF con la información de un tratamiento.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el paciente del tratamiento (en el caso de paciente).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del tratamiento.

        Returns:
            Response: La respuesta que contiene el PDF.
        """
        treatment = self.get_object(pk)

        return self.generate_pdf(treatment)

    def filter_and_order_treatments(self, treatments):
        """
        Filtra y ordena los tratamientos.

        Args:
            treatments (QuerySet): El conjunto de tratamientos.

        Returns:
            QuerySet El conjunto de tratamientos filtrados y ordenados.
        """
        query = self.request.query_params.get("search", None)
        ordering = self.request.query_params.get("ordering", None)

        if query:
            treatments = treatments.filter(
                Q(description__icontains=query)
                | Q(duration__icontains=query)
                | Q(application_frequency__icontains=query)
                | Q(recommended_dosage__icontains=query)
            )

        if ordering:
            treatments = treatments.order_by(ordering)

        return treatments

    def filter_treatments_by_statuses(self, treatments):
        """
        Filtra los tratamientos por estado.

        Args:
            treatments (QuerySet): El conjunto de tratamientos.

        Returns:
            QuerySet El conjunto de tratamientos filtrados.
        """
        desired_statuses = self.request.GET.getlist("status", None)
        if desired_statuses:
            return treatments.filter(status__in=desired_statuses)

        return treatments

    def filter_treatments_by_date_range(self, treatments, date_field):
        """
        Filtra los tratamientos por rango de fechas.

        Args:
            treatments (QuerySet): El conjunto de tratamientos.
            date_field (str): El campo de fecha a filtrar.

        Returns:
            QuerySet El conjunto de tratamientos filtrados.
        """
        start_date_str = self.request.query_params.get(f"{date_field}__gte", None)
        end_date_str = self.request.query_params.get(f"{date_field}__lte", None)

        if start_date_str and end_date_str:
            try:
                start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
                end_date = datetime.strptime(
                    end_date_str, "%Y-%m-%d"
                ).date() + timedelta(days=1)
            except ValueError:
                return self.error_response(
                    message="La fecha no es válida.",
                    status_code=status.HTTP_400_BAD_REQUEST,
                )

            return treatments.filter(**{f"{date_field}__range": [start_date, end_date]})

        return treatments
