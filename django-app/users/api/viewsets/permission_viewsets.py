from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Permission

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from users.api.serializers.permission_serializer import PermissionSerializer


class PermissionViewSet(viewsets.GenericViewSet):
  """
  Vista para gestionar permisos.

  Esta vista permite realizar operaciones CRUD para permisos.

  Attributes:
    model (Model): El modelo de permiso a gestionar.
    serializer_class (Serializer): El serializador para representar los datos del permiso.
    list_serializer_class (Serializer): El serializador para representar los datos de una lista de permisos.
    queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
  """
  
  model = Permission
  serializer_class = PermissionSerializer
  list_serializer_class = PermissionSerializer
  queryset = None
  
  def get_object(self, pk):
    return get_object_or_404(self.model, pk=pk)
  
  def get_queryset(self):
    if self.queryset is None:
      self.queryset = self.model.objects\
                      .all()
    return self.queryset
  
  def list(self, request):
    """
    Lista todos los permisos.

    Args:
        request (Request): La solicitud HTTP.

    Returns:
        Response: La respuesta que contiene la lista de permisos.
    """
    permissions = self.get_queryset()
    page = self.paginate_queryset(permissions)
    if page is not None:
      permissions_serializer = self.list_serializer_class(page, many=True)
      return self.get_paginated_response(permissions_serializer.data)
    else:
      permissions_serializer = self.list_serializer_class(permissions, many=True)
      return Response(permissions_serializer.data, status=status.HTTP_200_OK)