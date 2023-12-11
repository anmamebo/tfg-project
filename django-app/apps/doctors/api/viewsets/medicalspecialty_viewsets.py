from apps.doctors.api.serializers.medicalspecialty_serializer import (
    MedicalSpecialtySerializer,
)
from apps.doctors.models import MedicalSpecialty
from config.permissions import IsAdministratorOrDoctor
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class MedicalSpecialtyViewSet(viewsets.GenericViewSet):
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
            self.queryset = (
                self.model.objects.filter(state=True).all().order_by("-created_date")
            )
        return self.queryset

    @method_permission_classes([IsAdministratorOrDoctor])
    def list(self, request):
        """
        Lista todas las especialidades médicas.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que contiene la lista de especialidades médicas.
        """
        medicalspecialties = self.get_queryset()
        medicalspecialties_serializer = self.list_serializer_class(
            medicalspecialties, many=True
        )
        return Response(medicalspecialties_serializer.data, status=status.HTTP_200_OK)
