from django.shortcuts import get_object_or_404 
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets

from schedules.models import Schedule
from schedules.api.serializers.schedule_serializer import ScheduleSerializer


class ScheduleViewSet(viewsets.GenericViewSet):
  """
  Vista para gestionar horarios.

  Esta vista permite realizar operaciones CRUD para horarios.

  Attributes:
    model (Model): El modelo de horario a gestionar.
    serializer_class (Serializer): El serializador para representar los datos del horario.
    list_serializer_class (Serializer): El serializador para representar los datos de una lista de horarios.
    queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
  """
  model = Schedule
  serializer_class = ScheduleSerializer
  list_serializer_class = ScheduleSerializer
  queryset = None
  
  def get_object(self, pk):
    return get_object_or_404(self.model, pk=pk)
  
  def get_queryset(self):
    if self.queryset is None:
      self.queryset = self.model.objects\
                      .filter(state=True)\
                      .all()
    return self.queryset
  
  @action(detail=False, methods=['get'])
  def get_by_doctor(self, request):
    """
    Recupera los horarios de un médico, siempre y cuando el usuario sea un médico.
    
    Args:
        request (Request): La solicitud HTTP.
    
    Returns:
        Response: La respuesta que contiene los horarios del médico.
    """
    doctor = getattr(request.user, 'doctor', None)
    
    if not doctor:
      return Response({'message': 'El usuario no es un médico.'}, status=status.HTTP_400_BAD_REQUEST)
    
    schedules = self.get_queryset().filter(doctor=doctor).order_by('start_time')
    serializer = self.get_serializer(schedules, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
