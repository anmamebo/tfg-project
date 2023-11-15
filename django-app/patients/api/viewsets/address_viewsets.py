from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from patients.models import Address
from patients.api.serializers.address_serializer import AddressSerializer


class AddressViewSet(viewsets.GenericViewSet):
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
      self.queryset = self.model.objects\
                      .filter(state=True)\
                      .all()
    return self.queryset
  
  def update(self, request, pk=None):
    """
    Actualiza los detalles de una dirección existente.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El ID de la dirección.

    Returns:
        Response: La respuesta que indica si la dirección se ha actualizado correctamente o si ha habido errores.
    """
    address = self.get_object(pk)
    print(address)
    address_serializer = self.serializer_class(address, data=request.data, partial=True)
    if address_serializer.is_valid():
      address_serializer.save()
      return Response({
        'message': 'Dirección actualizada correctamente.'
      }, status=status.HTTP_200_OK)
      
    return Response({
      'message': 'Hay errores en la información enviada.',
      'errors': address_serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)