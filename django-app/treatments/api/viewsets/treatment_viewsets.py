from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action

from treatments.models import Treatment
from treatments.api.serializers.treatment_serializer import TreatmentSerializer, TreatmentListSerializer
from appointments.models import Appointment


class TreatmentViewSet(viewsets.GenericViewSet):
  """
  Vista para gestionar tratamientos.
  
  Esta vista permite realizar operaciones CRUD para tratamientos.
  
  Attributes:
    model (Model): El modelo de tratamiento a gestionar.
    serializer_class (Serializer): El serializador para representar los datos del tratamiento.
    list_serializer_class (Serializer): El serializador para representar los datos de una lista de tratamientos.
    queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
  """
  model = Treatment
  serializer_class = TreatmentSerializer
  list_serializer_class = TreatmentListSerializer
  queryset = None
  
  # Recupera el objeto basado en el identificador en la URL
  def get_object(self, pk):
    return get_object_or_404(self.model, pk=pk)
  
  # Define el conjunto de datos que se utilizará para las consultas
  def get_queryset(self):
    if self.queryset is None:
      self.queryset = self.model.objects\
                      .all().order_by('-created_date')
    return self.queryset
  
  def create(self, request):
    """
    Crea un tratamiento.
    
    Args:
        request (Request): La solicitud HTTP.
        
    Returns:
        Response: La respuesta que contiene los datos del tratamiento creado.
    """
    serializer = self.serializer_class(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({
        'message': 'Tratamiento creado correctamente.',  
      }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def retrieve(self, request, pk=None):
    """
    Recupera un tratamiento.
    
    Args:
        request (Request): La solicitud HTTP.
        pk (int): El identificador del tratamiento.
    
    Returns:
        Response: La respuesta que contiene los datos del tratamiento.
    """
    treatment = self.get_object(pk)
    serializer = self.serializer_class(treatment)
    return Response(serializer.data)
  
  def update(self, request, pk=None):
    """
    Actualiza un tratamiento.
    
    Args:
        request (Request): La solicitud HTTP.
        pk (int): El identificador del tratamiento.
    
    Returns:
        Response: La respuesta que contiene los datos del tratamiento actualizado.
    """
    treatment = self.get_object(pk)
    serializer = self.serializer_class(treatment, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({
        'message': 'Tratamiento actualizado correctamente.',  
      }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  @action(detail=False, methods=['get'])
  def list_for_appointment(self, request):
    """
    Lista todos los tratamientos de una cita.
    
    Args:
        request (Request): La solicitud HTTP.
    
    Returns:
        Response: La respuesta que contiene la lista de tratamientos.
    """
    appointment_id = self.request.query_params.get('appointment_id', None)
    
    if not appointment_id:
      return Response({'message': 'No se ha especificado el identificador de la cita.'}, status=status.HTTP_400_BAD_REQUEST)
      
    appointment = get_object_or_404(Appointment, pk=appointment_id)
    treatments = self.get_queryset().filter(appointment_id=appointment_id)
    
    paginate = self.request.query_params.get('paginate', None)
    if paginate and paginate == 'true':  
      page = self.paginate_queryset(treatments)
      if page is not None:
        serializer = self.list_serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)
    
    serializer = self.list_serializer_class(treatments, many=True)
    return Response(serializer.data)
