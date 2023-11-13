from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from departments.models import Room
from departments.api.serializers.room_serializer import RoomSerializer


class RoomViewSet(viewsets.GenericViewSet):
  """
  Vista para gestionar salas.

  Esta vista permite realizar operaciones CRUD para salas.

  Attributes:
    model (Model): El modelo de sala a gestionar.
    serializer_class (Serializer): El serializador para representar los datos de la sala.
    list_serializer_class (Serializer): El serializador para representar los datos de una lista de salas.
    queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
  """
  
  model = Room
  serializer_class = RoomSerializer
  list_serializer_class = RoomSerializer
  queryset = None
  
  def get_object(self, pk):
    return get_object_or_404(self.model, pk=pk)
  
  def get_queryset(self):
    if self.queryset is None:
      self.queryset = self.model.objects\
                      .filter(state=True)\
                      .all()
    return self.queryset
  
  def list(self, request):
    """
    Lista todas las salas.

    Args:
        request (Request): La solicitud HTTP.

    Returns:
        Response: La respuesta que contiene la lista de salas.
    """
    rooms = self.get_queryset()
    page = self.paginate_queryset(rooms)
    if page is not None:
      rooms_serializer = self.list_serializer_class(page, many=True)
      return self.get_paginated_response(rooms_serializer.data)
    else:
      rooms_serializer = self.list_serializer_class(rooms, many=True)
      return Response(rooms_serializer.data, status=status.HTTP_200_OK)