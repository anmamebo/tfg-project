from apps.appointments.api.permissions.appointment_permissions import (
    IsAppointmentPatient,
)
from apps.appointments.models import Appointment
from apps.treatments.api.permissions.treatment_permissions import (
    IsTreatmentPatient,
    isTreatmentDoctor,
)
from apps.treatments.api.serializers.treatment_serializer import (
    TreatmentListSerializer,
    TreatmentSerializer,
)
from apps.treatments.models import Treatment
from config.permissions import IsAdministratorOrDoctorOrPatient, IsDoctor, IsPatient
from django.db.models import Q
from django.shortcuts import get_object_or_404
from mixins.error_mixin import ErrorResponseMixin
from mixins.pagination_mixin import PaginationMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class TreatmentViewSet(viewsets.GenericViewSet, PaginationMixin, ErrorResponseMixin):
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

    @method_permission_classes([IsDoctor, isTreatmentDoctor])
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
        serializer = self.serializer_class(treatment, data=request.data)
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

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsAppointmentPatient])
    @action(detail=False, methods=["get"])
    def list_for_appointment(self, request):
        """
        Lista todos los tratamientos de una cita.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el paciente de la cita (en el caso de paciente).

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
        treatments = self.get_queryset().filter(appointment_id=appointment_id)

        return self.conditional_paginated_response(
            treatments, self.list_serializer_class
        )

    @method_permission_classes([IsPatient])
    @action(detail=False, methods=["get"])
    def list_for_patient(self, request):
        """
        Lista todos los tratamientos de un paciente.

        Permisos requeridos:
            - El usuario debe ser paciente.

        Parámetros opcionales:
            status (list): La lista de estados de los tratamientos.
            search (str): El texto a buscar en el nombre del tratamiento.
            ordering (str): El campo por el cual ordenar los resultados.
            paginate (str): Indica si se debe paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de tratamientos.
        """
        patient = getattr(request.user, "patient", None)
        treatments = self.get_queryset().filter(patient=patient).order_by("start_date")

        treatments = self.filter_treatments_by_statuses(treatments)
        treatments = self.filter_and_order_treatments(treatments)

        return self.conditional_paginated_response(
            treatments, self.list_serializer_class
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsTreatmentPatient])
    @action(detail=True, methods=["put"])
    def update_status(self, request, pk=None):
        """
        Actualiza el estado de un tratamiento, siempre y cuando
        la transición de estado sea válida.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
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

        treatment.status = new_status
        treatment.save()

        return Response(
            {
                "message": "Estado actualizado correctamente.",
            },
            status=status.HTTP_200_OK,
        )

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
