import os
from datetime import datetime, timedelta

from apps.appointments.models import Appointment
from apps.medicaltests.models import MedicalTest, MedicalTestAttachment
from apps.medicaltests.serializers import (
    AttachmentCreateSerializer,
    CreateMedicalTestSerializer,
    MedicalTestSerializer,
)
from apps.patients.models import Patient
from django.db.models import Q
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from mixins.error_mixin import ErrorResponseMixin
from mixins.pagination_mixin import PaginationMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class MedicalTestViewSet(viewsets.GenericViewSet, PaginationMixin, ErrorResponseMixin):
    """
    Vista para gestionar las pruebas médicas.

    Esta vista maneja las peticiones que se hagan a la API de pruebas médicas.

    Attributes:
        model (Model): Modelo utilizado para la representación de los datos.
        serializer_class (Serializer): Serializador utilizado para la representación de los datos.
        list_queryset (Serializer): Consulta inicial para obtener todos los pruebas médicas.
        queryset (MedicalTest): Consulta inicial para obtener todos los pruebas médicas.
    """

    model = MedicalTest
    serializer_class = MedicalTestSerializer
    list_serializer_class = MedicalTestSerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all().order_by("-created_date")
        return self.queryset

    def list(self, request):
        """
        Lista todas las pruebas médicas.

        Este método lista todas las pruebas médicas.

        Parámetros opcionales:
            paginate (bool): Indica si se desea paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de pruebas médicas.
        """
        medicaltests = self.get_queryset()

        return self.conditional_paginated_response(
            medicaltests, self.list_serializer_class
        )

    def create(self, request):
        """
        Crea una prueba médica.

        Este método crea una prueba médica.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que indica si la prueba médica fue creado o no.
        """
        serializer = CreateMedicalTestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Prueba médica creada correctamente."},
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Hay errores en la creación.",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    def retrieve(self, request, pk=None):
        """
        Obtiene una prueba médica.

        Este método obtiene una prueba médica.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El id de la prueba médica.

        Returns:
            Response: La respuesta que contiene los datos de la prueba médica.
        """
        medicaltest = self.get_object(pk)
        serializer = self.serializer_class(medicaltest)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        """
        Actualiza una prueba médica.

        Este método actualiza una prueba médica.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El id de la prueba médica.

        Returns:
            Response: La respuesta que indica si la prueba médica fue actualizada o no.
        """
        medicaltest = self.get_object(pk)
        serializer = self.serializer_class(medicaltest, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Prueba médica actualizada correctamente."},
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="Hay errores en la actualización.",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @action(detail=False, methods=["get"], url_path="appointment")
    def list_for_appointment(self, request):
        """
        Lista todas las pruebas médicas de una cita.

        Este método lista todas las pruebas médicas de una cita.

        Parámetros:
            appointment_id (int): El id de la cita.

        Parámetros opcionales:
            paginate (bool): Indica si se desea paginar los resultados.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de pruebas médicas de una cita.
        """
        appointment_id = request.query_params.get("appointment_id", None)

        if not appointment_id:
            return self.error_response(
                message="No se ha especificado el identificador de la cita.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        appointment = get_object_or_404(Appointment, pk=appointment_id)
        medicaltests = (
            self.get_queryset()
            .filter(appointment_id=appointment_id, state=True)
            .order_by("-created_date")
        )

        return self.conditional_paginated_response(
            medicaltests, self.list_serializer_class
        )

    @action(detail=False, methods=["get"], url_path="patient")
    def list_for_patient(self, request):
        """
        Lista todas las pruebas médicas de un paciente.

        Este método lista todas las pruebas médicas de un paciente.

        Parámetros opcionales:
            patient_id (int): El id del paciente.
            search (str): El texto por el cual se desea buscar en los resultados.
            ordering (str): El campo por el cual se desea ordenar los resultados.
            paginate (bool): Indica si se desea paginar los resultados.
            completed (bool): Indica si se desea obtener las pruebas médicas completadas o no.
            date_prescribed__gte (str): La fecha de prescripción mínima.
            date_prescribed__lte (str): La fecha de prescripción máxima.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de pruebas médicas de un paciente.
        """
        if request.GET.get("patient_id", None):
            patient_id = request.GET.get("patient_id", None)
            patient = get_object_or_404(Patient, pk=patient_id)
        else:
            patient = getattr(request.user, "patient", None)

        medicaltests = (
            self.get_queryset()
            .filter(patient=patient, state=True)
            .order_by("-date_prescribed")
        )

        medicaltests = self.filter_and_order_medicaltests(medicaltests)
        medicaltests = self.filter_medicaltests_by_date_range(
            medicaltests, "date_prescribed"
        )

        return self.conditional_paginated_response(
            medicaltests, self.list_serializer_class
        )

    @action(detail=True, methods=["get"], url_path="download-attachment")
    def download_attachment(self, request, pk=None):
        """
        Obtiene el archivo adjunto de una prueba médica.

        Este método obtiene el archivo adjunto de una prueba médica.

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El id de la prueba médica.

        Returns:
            Response: La respuesta que contiene el archivo adjunto de la prueba médica.
        """
        attachment = get_object_or_404(MedicalTestAttachment, pk=pk)

        return FileResponse(
            attachment.file.open(), as_attachment=True, filename=attachment.file.name
        )

    @action(detail=False, methods=["post"], url_path="upload-attachment")
    def upload_attachment(self, request):
        """
        Adjunta un archivo a una prueba médica.

        Este método adjunta un archivo a una prueba médica.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que indica si el archivo fue adjuntado o no.
        """
        serializer = AttachmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Archivo adjuntado correctamente."},
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Hay errores en la creación.",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @action(detail=True, methods=["delete"], url_path="delete-attachment")
    def delete_attachment(self, request, pk=None):
        """
        Elimina el archivo adjunto de una prueba médica.

        Este método elimina el archivo adjunto de una prueba médica.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que indica si el archivo fue eliminado o no.
        """
        attachment = get_object_or_404(MedicalTestAttachment, pk=pk)
        if attachment.file:
            path = attachment.file.path
            if path:
                attachment.delete()
                if os.path.exists(path):
                    os.remove(path)

                return Response(
                    {"message": "Archivo eliminado correctamente."},
                    status=status.HTTP_200_OK,
                )

        return self.error_response(
            message="No se pudo eliminar el archivo.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    def filter_and_order_medicaltests(self, medicaltests):
        """
        Filtra y ordena las pruebas médicas.

        Este método filtra y ordena las pruebas médicas.

        Args:
            medicaltests (QuerySet): Las pruebas médicas.

        Returns:
            QuerySet: Las pruebas médicas filtradas y ordenadas.
        """
        query = self.request.query_params.get("search", None)
        ordering = self.request.query_params.get("ordering", None)
        completed = self.request.query_params.get("completed", None)

        if query:
            medicaltests = medicaltests.filter(
                Q(id__icontains=query) | Q(name__icontains=query)
            )

        if ordering:
            medicaltests = medicaltests.order_by(ordering)

        if completed in ["true", "false"]:
            completed_boolean = completed == "true"
            medicaltests = medicaltests.filter(is_completed=completed_boolean)

        return medicaltests

    def filter_medicaltests_by_date_range(self, medicaltests, date_field):
        """
        Filtra las pruebas médicas por rango de fechas.

        Args:
            medicaltests (QuerySet): El conjunto de pruebas médicas.
            date_field (str): El campo de fecha de la prueba médica.

        Returns:
            QuerySet: El conjunto de pruebas médicas filtradas.
        """
        start_date_str = self.request.query_params.get(f"{date_field}__gte", None)
        end_date_str = self.request.query_params.get(f"{date_field}__lte", None)

        if start_date_str and end_date_str:
            try:
                start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
                end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()
                start_date = timezone.make_aware(
                    datetime.combine(start_date, datetime.min.time())
                )
                end_date = timezone.make_aware(
                    datetime.combine(end_date, datetime.max.time())
                )
            except ValueError:
                return self.error_response(
                    message="La fecha no es válida.",
                    status_code=status.HTTP_400_BAD_REQUEST,
                )

            return medicaltests.filter(
                **{f"{date_field}__range": [start_date, end_date]}
            )

        return medicaltests
