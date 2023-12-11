from apps.appointments.models import Appointment
from apps.treatments.api.serializers.treatment_serializer import (
    TreatmentListSerializer,
    TreatmentSerializer,
)
from apps.treatments.models import Treatment
from config.permissions import IsAdministratorOrDoctorOrPatient, IsDoctor
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class TreatmentViewSet(viewsets.GenericViewSet):
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

        return Response(
            {
                "message": "Ha ocurrido un error al crear el tratamiento.",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    def retrieve(self, request, pk=None):
        """
        Recupera un tratamiento.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del tratamiento.

        Returns:
            Response: La respuesta que contiene los datos del tratamiento.
        """
        treatment = self.get_object(pk)
        serializer = self.serializer_class(treatment)
        return Response(serializer.data)

    @method_permission_classes([IsDoctor])
    def update(self, request, pk=None):
        """
        Actualiza un tratamiento.

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

        return Response(
            {
                "message": "Ha ocurrido un error al actualizar el tratamiento.",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    @action(detail=False, methods=["get"])
    def list_for_appointment(self, request):
        """
        Lista todos los tratamientos de una cita.

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
            return Response(
                {"message": "No se ha especificado el identificador de la cita."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        appointment = get_object_or_404(Appointment, pk=appointment_id)
        treatments = self.get_queryset().filter(appointment_id=appointment_id)

        paginate = self.request.query_params.get("paginate", None)
        if paginate and paginate == "true":
            page = self.paginate_queryset(treatments)
            if page is not None:
                serializer = self.list_serializer_class(page, many=True)
                return self.get_paginated_response(serializer.data)

        serializer = self.list_serializer_class(treatments, many=True)
        return Response(serializer.data)

    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    @action(detail=False, methods=["get"])
    def list_for_patient(self, request):
        """
        Lista todos los tratamientos de un paciente.

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

        if not patient:
            return Response(
                {"message": "El usuario no es un paciente."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        treatments = self.get_queryset().filter(patient=patient).order_by("start_date")

        desired_statuses = request.GET.getlist("status", None)
        if desired_statuses:
            treatments = treatments.filter(status__in=desired_statuses)

        treatments = self.filter_treatments(treatments)
        treatments = self.order_treatments(treatments)

        paginate = self.request.query_params.get("paginate", None)
        if paginate and paginate == "true":
            page = self.paginate_queryset(treatments)
            if page is not None:
                serializer = self.list_serializer_class(page, many=True)
                return self.get_paginated_response(serializer.data)

        serializer = self.list_serializer_class(treatments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    @action(detail=True, methods=["put"])
    def update_status(self, request, pk=None):
        """
        Actualiza el estado de un tratamiento, siempre y cuando
        la transición de estado sea válida.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El identificador del tratamiento.

        Returns:
            Response: La respuesta con el mensaje de éxito o error.
        """
        new_status = request.data.get("status", None)
        if not new_status:
            return Response(
                {"message": "No se ha especificado el estado."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        treatment = self.get_object(pk)
        current_status = treatment.status

        if new_status not in self.status_transitions.get(current_status, []):
            return Response(
                {"message": "El estado no es válido."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        treatment.status = new_status
        treatment.save()

        return Response(
            {
                "message": "Estado actualizado correctamente.",
            },
            status=status.HTTP_200_OK,
        )

    def filter_treatments(self, treatments):
        """
        Filtra los tratamientos.

        Args:
            treatments (QuerySet): El conjunto de tratamientos.

        Returns:
            QuerySet El conjunto de tratamientos filtrados.
        """
        query = self.request.query_params.get("search", None)
        if query:
            treatments = treatments.filter(
                Q(description__icontains=query)
                | Q(duration__icontains=query)
                | Q(application_frequency__icontains=query)
                | Q(recommended_dosage__icontains=query)
            )

        return treatments

    def order_treatments(self, treatments):
        """
        Ordena los tratamientos.

        Args:
            treatments (QuerySet): El conjunto de tratamientos.

        Returns:
            QuerySet El conjunto de tratamientos ordenados.
        """
        ordering = self.request.query_params.get("ordering", None)
        if ordering:
            treatments = treatments.order_by(ordering)

        return treatments
