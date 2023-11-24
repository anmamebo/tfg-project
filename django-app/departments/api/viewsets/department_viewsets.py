from django.db.models import Q
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action

from departments.models import Department
from departments.api.serializers.department_serializer import (DepartmentSerializer, DepartmentWithDoctorsSerializer)


class DepartmentViewSet(viewsets.GenericViewSet):
  """
  Vista para gestionar departamentos.

  Esta vista permite realizar operaciones CRUD para departamentos.

  Attributes:
    model (Model): El modelo de departamento a gestionar.
    serializer_class (Serializer): El serializador para representar los datos del departamento.
    list_serializer_class (Serializer): El serializador para representar los datos de una lista de departamentos.
    queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
  """
  
  model = Department
  serializer_class = DepartmentWithDoctorsSerializer
  list_serializer_class = DepartmentSerializer
  queryset = None
  
  def get_object(self, pk):
    return get_object_or_404(self.model, pk=pk)
  
  def get_queryset(self):
    if self.queryset is None:
      self.queryset = self.model.objects\
                      .filter(state=True)\
                      .all().order_by('-created_date')
    return self.queryset
  
  def list(self, request):
    """
    Lista todos los departamentos.

    Args:
        request (Request): La solicitud HTTP.

    Returns:
        Response: La respuesta que contiene la lista de departamentos.
    """
    departments = self.get_queryset()
    
    query = self.request.query_params.get('search', None)
    if query:
      departments = departments.filter(
        Q(name__icontains=query) | Q(description__icontains=query)
      )
      
    paginate = self.request.query_params.get('paginate', None)
    if paginate and paginate == 'true':
      page = self.paginate_queryset(departments)
      if page is not None:
        departments_serializer = self.list_serializer_class(page, many=True)
        return self.get_paginated_response(departments_serializer.data)
    
    departments_serializer = self.list_serializer_class(departments, many=True)
    return Response(departments_serializer.data, status=status.HTTP_200_OK)
  
  def create(self, request):
    """
    Crea un departamento.

    Args:
        request (Request): La solicitud HTTP.

    Returns:
        Response: La respuesta el resultado de la operación.
    """
    department_serializer = self.serializer_class(data=request.data)
    if department_serializer.is_valid():
      department_serializer.save()
      return Response({
        'message': 'Departamento creado correctamente.'
      }, status=status.HTTP_201_CREATED)
    
    return Response(department_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def retrieve(self, request, pk=None):
    """
    Obtiene un departamento.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El id del departamento a obtener.

    Returns:
        Response: La respuesta que contiene el departamento.
    """
    department = self.get_object(pk)
    department_serializer = self.serializer_class(department)
    return Response(department_serializer.data, status=status.HTTP_200_OK)
  
  def update(self, request, pk=None):
    """
    Actualiza un departamento.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El id del departamento a actualizar.

    Returns:
        Response: La respuesta el resultado de la operación.
    """
    department = self.get_object(pk)
    department_serializer = self.serializer_class(department, data=request.data)
    if department_serializer.is_valid():
      department_serializer.save()
      return Response({
        'message': 'Departamento actualizado correctamente.'
      }, status=status.HTTP_200_OK)
    
    return Response({
      'message': 'Hay errores en la actualización.',
      'errors': department_serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)  
    
  def destroy(self, request, pk=None):
    """
    Elimina un departamento.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El id del departamento a eliminar.

    Returns:
        Response: La respuesta el resultado de la operación.
    """
    department = self.get_queryset().filter(id=pk).first()
    if department:
      department.state = False
      department.save()
      return Response({
        'message': 'Departamento eliminado correctamente.'
      }, status=status.HTTP_200_OK)
      
    return Response({
      'message': 'No se ha encontrado el departamento.'
    }, status=status.HTTP_400_BAD_REQUEST)
    
  @action(detail=True, methods=['put'])
  def activate(self, request, pk=None):
    """
    Activa un departamento.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El id del departamento a activar.

    Returns:
        Response: La respuesta el resultado de la operación.
    """
    department = self.get_object(pk)
    if department:
      department.state = True
      department.save()
      return Response({
        'message': 'Departamento activado correctamente.'
      }, status=status.HTTP_200_OK)
      
    return Response({
      'message': 'No se ha encontrado el departamento.'
    }, status=status.HTTP_400_BAD_REQUEST)
