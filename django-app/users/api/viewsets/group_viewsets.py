from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from users.api.serializers.group_serializer import  (GroupSerializer, GroupListSerializer)


class GroupViewSet(viewsets.GenericViewSet):
  """
  Vista para gestionar grupos.

  Esta vista permite realizar operaciones CRUD para grupos.

  Attributes:
    model (Model): El modelo de grupo a gestionar.
    serializer_class (Serializer): El serializador para representar los datos del grupo.
    list_serializer_class (Serializer): El serializador para representar los datos de una lista de grupos.
    queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
  """
  
  model = Group
  serializer_class = GroupSerializer
  list_serializer_class = GroupListSerializer
  queryset = None
  
  def get_object(self, pk):
    return get_object_or_404(self.model, pk=pk)
  
  def get_queryset(self):
    if self.queryset is None:
      self.queryset = self.model.objects\
                      .all().order_by('id')
    return self.queryset
  
  def list(self, request):
    """
    Lista todos los grupos.

    Args:
        request (Request): La solicitud HTTP.

    Returns:
        Response: La respuesta que contiene la lista de grupos.
    """
    groups = self.get_queryset()
    
    ordering = self.request.query_params.get('ordering', None)
    if ordering:
      groups = groups.order_by(ordering)
    
    page = self.paginate_queryset(groups)
    if page is not None:
      groups_serializer = self.list_serializer_class(page, many=True)
      return self.get_paginated_response(groups_serializer.data)
    else:
      groups_serializer = self.list_serializer_class(groups, many=True)
      return Response(groups_serializer.data, status=status.HTTP_200_OK)
  
  def create(self, request):
    """
    Crea un nuevo grupo.

    Args:
        request (Request): La solicitud HTTP.

    Returns:
        Response: La respuesta que indica si el grupo se ha creado correctamente o si ha habido errores.
    """
    group_serializer = self.serializer_class(data=request.data)
    if group_serializer.is_valid():
      group_serializer.save()
      return Response({
        'message': 'Grupo creado correctamente.'
      }, status=status.HTTP_201_CREATED)

    return Response({
      'message': 'Hay errores en la creación',
      'errors': group_serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)
  
  def retrieve(self, request, pk=None):
    """
    Recupera los detalles de un grupo específico.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El ID del grupo.

    Returns:
        Response: La respuesta que contiene los detalles del grupo o un mensaje de error si no tiene permisos.
    """
    group = self.get_object(pk)
    group_serializer = self.serializer_class(group)
    return Response(group_serializer.data, status=status.HTTP_200_OK)
  
  def update(self, request, pk=None):
    """
    Actualiza los detalles de un grupo existente.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El ID del grupo.

    Returns:
        Response: La respuesta que indica si el grupo se ha actualizado correctamente o si ha habido errores.
    """
    group = self.get_object(pk)
    group_serializer = self.serializer_class(group, data=request.data)
    if group_serializer.is_valid():
      group_serializer.save()
      return Response({
        'message': 'Grupo actualizado correctamente.'
      }, status=status.HTTP_200_OK)

    return Response({
      'message': 'Hay errores en la actualización',
      'errors': group_serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)
    
  def destroy(self, request, pk=None):
    """
    Elimina un grupo existente.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El ID del grupo a eliminar.

    Returns:
        Response: La respuesta que indica si el grupo se ha eliminado correctamente o si ha habido errores.
    """
    group = self.get_object(pk)
    group.delete()
    return Response({
      'message': 'Grupo eliminado correctamente.'
    }, status=status.HTTP_200_OK)