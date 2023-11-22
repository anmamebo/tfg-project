from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

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
                      .all()
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
    departments_serializer = self.list_serializer_class(departments, many=True)
    return Response(departments_serializer.data, status=status.HTTP_200_OK)