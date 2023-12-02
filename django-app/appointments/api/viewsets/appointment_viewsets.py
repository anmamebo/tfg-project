from datetime import datetime, timezone
import pytz

from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action

from djangoRestApi.settings import TIME_ZONE

from appointments.models import Appointment
from appointments.api.serializers.appointment_serializer import AppointmentListSerializer


tz = pytz.timezone(TIME_ZONE) # Zona horaria de la aplicación

class AppointmentViewSet(viewsets.GenericViewSet):
  """
  Vista para gestionar citas.
  
  Esta vista permite realizar operaciones CRUD para citas.
  
  Attributes:
    model (Model): El modelo de cita a gestionar.
    serializer_class (Serializer): El serializador para representar los datos de la cita.
    list_serializer_class (Serializer): El serializador para representar los datos de una lista de citas.
    queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
  """
  model = Appointment
  serializer_class = AppointmentListSerializer
  list_serializer_class = AppointmentListSerializer
  queryset = None
  status_transitions = {
    'pending': ['scheduled', 'cancelled'],
    'scheduled': ['in_progress', 'completed', 'rescheduled', 'no_show', 'cancelled'],
    'in_progress': ['completed', 'rescheduled'],
    'completed': ['rescheduled'],
    'rescheduled': ['in_progress', 'completed', 'no_show', 'cancelled'],
    'no_show': ['rescheduled', 'scheduled'],
    'cancelled': [],
  }
  
  # Recupera el objeto basado en el identificador en la URL
  def get_object(self, pk):
    return get_object_or_404(self.model, pk=pk)
  
  # Define el conjunto de datos que se utilizará para las consultas
  def get_queryset(self):
    if self.queryset is None:
      self.queryset = self.model.objects\
                      .all().order_by('-created_date')
    return self.queryset
  
  def list(self, request):
    """
    Lista todas las citas.
    
    Args:
        request (Request): La solicitud HTTP.
        
    Returns:
        Response: La respuesta que contiene la lista de citas.
    """
    appointments = self.get_queryset()
    
    state = self.request.query_params.get('state', None)
    if state in ['true', 'false']:
      state_boolean = state == 'true'
      appointments = appointments.filter(state=state_boolean)
      
    page = self.paginate_queryset(appointments)
    if page is not None:
      appointments_serializer = self.list_serializer_class(page, many=True)
      return self.get_paginated_response(appointments_serializer.data)
    
    appointments_serializer = self.list_serializer_class(appointments, many=True)
    return Response(appointments_serializer.data, status=status.HTTP_200_OK)
  
  def update(self, request, pk=None):
    """
    Actualiza una cita.
    
    Args:
        request (Request): La solicitud HTTP.
        pk (int): El identificador de la cita.
        
    Returns:
        Response: La respuesta que contiene la cita.
    """
    if hasattr(request.user, 'doctor') and request.user.doctor:
      doctor = request.user.doctor
      appointment = self.get_object(pk)
      if appointment.doctor == doctor:
        serializer = self.serializer_class(appointment, data=request.data, partial=True)
        if serializer.is_valid():
          serializer.save()
          return Response({
            'message': 'La cita ha sido actualizada.'
          }, status=status.HTTP_200_OK)
        
      return Response({
        'message': 'La cita no pertenece al doctor.'
      }, status=status.HTTP_400_BAD_REQUEST)
      
    return Response({
      'message': 'El usuario no es un médico.'
    }, status=status.HTTP_400_BAD_REQUEST)
  
  @action(detail=False, methods=['get'])
  def list_for_doctor(self, request):
    """
    Lista todas las citas de un doctor.
    
    Args:
        request (Request): La solicitud HTTP.
        doctor_id (int): El identificador del doctor.
        
    Returns:
        Response: La respuesta que contiene la lista de citas.
    """
    if hasattr(request.user, 'doctor') and request.user.doctor:
      doctor = request.user.doctor  
      appointments = self.get_queryset().filter(doctor=doctor).order_by('schedule__start_time')
      
      ordering = self.request.query_params.get('ordering', None)
      if ordering:
        appointments = appointments.order_by(ordering)
      
      page = self.paginate_queryset(appointments)
      if page is not None:
        appointments_serializer = self.list_serializer_class(page, many=True)
        return self.get_paginated_response(appointments_serializer.data)
      
      appointments_serializer = self.list_serializer_class(appointments, many=True)
      return Response(appointments_serializer.data, status=status.HTTP_200_OK)
    
    return Response({
      'message': 'El usuario no es un médico.'
    }, status=status.HTTP_400_BAD_REQUEST)
  
  @action(detail=True, methods=['get'])
  def retrieve_for_doctor(self, request, pk=None):
    """
    Recupera una cita de un doctor.
    
    Args:
        request (Request): La solicitud HTTP.
        pk (int): El identificador de la cita.
        
    Returns:
        Response: La respuesta que contiene la cita.
    """
    if hasattr(request.user, 'doctor') and request.user.doctor:
      doctor = request.user.doctor
      appointment = self.get_object(pk)
      if appointment.doctor == doctor:
        appointment_serializer = self.serializer_class(appointment)
        return Response(appointment_serializer.data, status=status.HTTP_200_OK)
      
      return Response({
        'message': 'La cita no pertenece al doctor.'
      }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({
      'message': 'El usuario no es un médico.'
    }, status=status.HTTP_400_BAD_REQUEST)
  
  @action(detail=True, methods=['put'])
  def update_status(self, request, pk=None):
    """
    Actualiza el estado de una cita.
    
    Args:
        request (Request): La solicitud HTTP.
        pk (int): El identificador de la cita.
        
    Returns:
        Response: La respuesta que contiene la cita.
    """
    if hasattr(request.user, 'doctor') and request.user.doctor: # Si el usuario es un doctor
      doctor = request.user.doctor
      appointment = self.get_object(pk)
      if appointment.doctor == doctor: # Si la cita pertenece al doctor
        new_status = request.data.get('status', None)
        if new_status: # Si el estado es enviado
          current_status = appointment.status
          if new_status in self.status_transitions[current_status]: # Si el estado es válido
            appointment.status = new_status
            
            if new_status == 'completed':
              appointment.end_time = tz.localize(datetime.now()) # Se establece la hora de finalización
              appointment.actual_duration = (appointment.end_time - appointment.time_patient_arrived).total_seconds() / 60 # Se calcula la duración real
            elif new_status == 'in_progress':
              appointment.time_patient_arrived = tz.localize(datetime.now()) # Se establece la hora de llegada del paciente
            
            appointment.save()
            return Response({
              'message': 'El estado de la cita ha sido actualizado.'
            }, status=status.HTTP_200_OK)
          
          return Response({
            'message': 'El estado no es válido.'
          }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
          'message': 'El estado es requerido.'
        }, status=status.HTTP_400_BAD_REQUEST)
      
      return Response({
        'message': 'La cita no pertenece al doctor.'
      }, status=status.HTTP_400_BAD_REQUEST)
      
    return Response({
      'message': 'El usuario no es un médico.'
    }, status=status.HTTP_400_BAD_REQUEST)
    