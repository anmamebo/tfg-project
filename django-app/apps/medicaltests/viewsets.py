import os

from apps.medicaltests.models import MedicalTest, MedicalTestAttachment
from apps.medicaltests.serializers import (
    AttachmentCreateSerializer,
    MedicalTestSerializer,
)
from django.http import FileResponse
from django.shortcuts import get_object_or_404
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
        serializer = self.serializer_class(data=request.data)
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
