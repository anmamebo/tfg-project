from apps.addresses.permissions import IsAddressOwner
from apps.addresses.serializers import AddressSerializer
from apps.patients.models import Address, Patient
from config.permissions import IsAdministratorOrDoctorOrPatient
from django.shortcuts import get_object_or_404
from mixins.error_mixin import ErrorResponseMixin
from rest_framework import status, viewsets
from rest_framework.response import Response
from utilities.permissions_helper import method_permission_classes


class AddressViewSet(viewsets.GenericViewSet, ErrorResponseMixin):
    """
    Vista para gestionar direcciones.

    Esta vista permite realizar operaciones CRUD para direcciones.

    Attributes:
        model (Model): El modelo de direccion a gestionar.
        serializer_class (Serializer): El serializador para representar los datos de la direccion.
        list_serializer_class (Serializer): El serializador para representar los datos de una lista de direcciones.
        queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
    """

    model = Address
    serializer_class = AddressSerializer
    list_serializer_class = AddressSerializer
    queryset = None

    # Recupera el objeto basado en el identificador en la URL
    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    # Define el conjunto de datos que se utilizará para las consultas
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter(state=True).all()
        return self.queryset

    @method_permission_classes([IsAdministratorOrDoctorOrPatient])
    def create(self, request):
        """
        Crea una nueva dirección y la asocia a un paciente,
        para ello se debe enviar el ID del paciente.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.

        Args:
            request (Request): La solicitud HTTP.

        Returns:
            Response: La respuesta que indica si la dirección se ha creado correctamente o si ha habido errores.
        """
        patient_id = request.data.get("patient_id")

        if not patient_id:
            return self.error_response(
                message="No se ha enviado el ID del paciente.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        patient = get_object_or_404(Patient, pk=patient_id)

        address_serializer = self.serializer_class(data=request.data)
        if address_serializer.is_valid():
            address = address_serializer.save()  # Guarda la dirección creada
            patient.address = address
            patient.save()
            return Response(
                {"message": "Dirección creada correctamente."},
                status=status.HTTP_201_CREATED,
            )

        return self.error_response(
            message="Hay errores en la información enviada.",
            errors=address_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsAddressOwner])
    def update(self, request, pk=None):
        """
        Actualiza los detalles de una dirección existente.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paicente.
            - El usuario debe ser el dueño de la dirección (en el caso de paciente).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID de la dirección.

        Returns:
            Response: La respuesta que indica si la dirección se ha actualizado correctamente o si ha habido errores.
        """
        address = self.get_object(pk)
        address_serializer = self.serializer_class(
            address, data=request.data, partial=True
        )
        if address_serializer.is_valid():
            address_serializer.save()
            return Response(
                {"message": "Dirección actualizada correctamente."},
                status=status.HTTP_200_OK,
            )

        return self.error_response(
            message="Hay errores en la información enviada.",
            errors=address_serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    @method_permission_classes([IsAdministratorOrDoctorOrPatient, IsAddressOwner])
    def destroy(self, request, pk=None):
        """
        Elimina una dirección existente.

        Permisos requeridos:
            - El usuario debe ser administrador, médico o paciente.
            - El usuario debe ser el dueño de la dirección (en el caso de paciente).

        Args:
            request (Request): La solicitud HTTP.
            pk (int): El ID de la dirección.

        Returns:
            Response: La respuesta que indica si la dirección se ha eliminado correctamente o si ha habido errores.
        """
        address = self.get_object(pk)
        address.delete()

        return Response(
            {"message": "Dirección eliminada correctamente."},
            status=status.HTTP_200_OK,
        )
