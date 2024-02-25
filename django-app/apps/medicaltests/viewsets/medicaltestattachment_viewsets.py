import os

from apps.medicaltests.models import MedicalTestAttachment
from apps.medicaltests.permissions import IsAttachmentPatient
from apps.medicaltests.serializers import (
    AttachmentCreateSerializer,
    MedicalTestAttachmentSerializer,
)
from config.permissions import IsAdministratorOrDoctor, IsAdministratorOrDoctorOrPatient
from django.conf import settings
from django.core.files.storage import default_storage
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from mixins.error_mixin import ErrorResponseMixin
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class MedicalTestAttachmentViewSet(viewsets.GenericViewSet, ErrorResponseMixin):
    """
    Vista para gestionar los archivos adjuntos de las pruebas médicas.

    Esta vista maneja las peticiones que se hagan a la API de archivos adjuntos de las pruebas médicas.

    Attributes:
        model (Model): Modelo utilizado para la representación de los datos.
        serializer_class (Serializer): Serializador utilizado para la representación de los datos.
    """

    model = MedicalTestAttachment
    serializer_class = MedicalTestAttachmentSerializer
    list_serializer_class = MedicalTestAttachmentSerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all().order_by("-created_date")
        return self.queryset

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsAttachmentPatient])
    @action(detail=True, methods=["get"], url_path="download-attachment")
    def download_attachment(self, request, pk=None):
        """
        Obtiene el archivo adjunto de una prueba médica.

        Este método obtiene el archivo adjunto de una prueba médica.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el paciente del archivo adjunto (en el caso de paciente).

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

    @method_permission_classes([IsAdministratorOrDoctor])
    @action(detail=False, methods=["post"], url_path="upload-attachment")
    def upload_attachment(self, request):
        """
        Adjunta un archivo a una prueba médica.

        Este método adjunta un archivo a una prueba médica.

        Permisos requeridos:
            - El usuario debe ser administrador o médico.

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

    @method_permission_classes([IsAdministratorOrDoctor])
    @action(detail=True, methods=["delete"], url_path="delete-attachment")
    def delete_attachment(self, request, pk=None):
        """
        Elimina el archivo adjunto de una prueba médica.

        Este método elimina el archivo adjunto de una prueba médica.

        Permisos requeridos:
            - El usuario debe ser administrador o médico.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que indica si el archivo fue eliminado o no.
        """
        attachment = get_object_or_404(MedicalTestAttachment, pk=pk)
        if attachment.file:

            if (
                settings.DEFAULT_FILE_STORAGE
                == "storages.backends.gcloud.GoogleCloudStorage"
            ):
                path = attachment.file.name
                if path:
                    default_storage.delete(path)
            else:
                path = attachment.file.path
                if path:
                    if os.path.exists(path):
                        os.remove(path)

            attachment.delete()

            return Response(
                {"message": "Archivo eliminado correctamente."},
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="No se pudo eliminar el archivo.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )
