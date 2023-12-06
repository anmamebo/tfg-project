from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Permission

from rest_framework import status, viewsets
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
  queryset = Permission.objects.all()
  
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
    
    Parámetros opcionales:
      search (str): Una cadena de texto para buscar permisos.
      ordering (str): El campo por el que se ordenarán los permisos.

    Args:
        request (Request): La solicitud HTTP.

    Returns:
        Response: La respuesta que contiene la lista de permisos.
    """
    permissions = self.get_queryset()
    
    permissions = self.filter_permissions(permissions) # Filtrar permisos
    permissions = self.order_permissions(permissions) # Ordenar permisos
    
    page = self.paginate_queryset(permissions)
    if page is not None:
      permissions_serializer = self.list_serializer_class(page, many=True)
      return self.get_paginated_response(permissions_serializer.data)
    
    permissions_serializer = self.list_serializer_class(permissions, many=True)
    return Response(permissions_serializer.data, status=status.HTTP_200_OK)
    

  def filter_permissions(self, permissions):
    """
    Filtra los permisos.

    Args:
        permissions (QuerySet): El conjunto de permisos.

    Returns:
        QuerySet: El conjunto de permisos filtrados.
    """
    # Obtener el parámetro de búsqueda de la solicitud
    query = self.request.query_params.get('search', None)
    
    # Realizar la búsqueda si se proporciona un parámetro de búsqueda
    if query:
      # Buscar en múltiples campos utilizando la cláusula Q de Django
      permissions = permissions.filter(
        Q(name__icontains=query) | Q(codename__icontains=query) | 
        Q(content_type__model__icontains=query)
      )
      
    return permissions
  
  def order_permissions(self, permissions):
    """
    Ordena los permisos.

    Args:
        permissions (QuerySet): El conjunto de permisos.

    Returns:
        QuerySet: El conjunto de permisos ordenados.
    """
    ordering = self.request.query_params.get('ordering', None)
    if ordering:
      permissions = permissions.order_by(ordering)
      
    return permissions