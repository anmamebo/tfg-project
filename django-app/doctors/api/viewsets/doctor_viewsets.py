from django.db.models import Q
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action

from doctors.models import Doctor
from doctors.api.serializers.doctor_serializer import DoctorSerializer
from users.api.serializers.user_serializer import UserSerializer


class DoctorViewSet(viewsets.GenericViewSet):
  """
  Vista para gestionar médicos.

  Esta vista permite realizar operaciones CRUD para médicos.

  Attributes:
    model (Model): El modelo de médico a gestionar.
    serializer_class (Serializer): El serializador para representar los datos del médico.
    list_serializer_class (Serializer): El serializador para representar los datos de una lista de médicos.
    queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
  """
  
  model = Doctor
  serializer_class = DoctorSerializer
  list_serializer_class = DoctorSerializer
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
    Lista todos los doctores.

    Args:
        request (Request): La solicitud HTTP.

    Returns:
        Response: La respuesta que contiene la lista de doctores.
    """
    doctors = self.get_queryset()
    
    query = self.request.query_params.get('search', None)
    
    if query:
      doctors = doctors.filter(
        Q(user__name__icontains=query) | Q(user__last_name__icontains=query) |
        Q(user__email__icontains=query) | Q(collegiate_number__icontains=query)
      )
    
    page = self.paginate_queryset(doctors)
    if page is not None:
      doctors_serializer = self.list_serializer_class(page, many=True)
      return self.get_paginated_response(doctors_serializer.data)
    else:
      doctors_serializer = self.list_serializer_class(doctors, many=True)
      return Response(doctors_serializer.data, status=status.HTTP_200_OK)
    
  def retrieve(self, request, pk=None):
    """
    Recupera un doctor.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El identificador del doctor.

    Returns:
        Response: La respuesta que contiene el doctor.
    """
    doctor = self.get_object(pk)
    doctor_serializer = self.serializer_class(doctor)
    return Response(doctor_serializer.data, status=status.HTTP_200_OK)

  def update(self, request, pk=None):
    """
    Actualiza un doctor.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El identificador del doctor.

    Returns:
        Response: La respuesta que contiene el resultado de la actualización.
    """
    doctor = self.get_object(pk)
    
    user_data = request.data.pop('user', None)
    if user_data:
      user_serializer = UserSerializer(doctor.user, data=user_data, partial=True)
      if user_serializer.is_valid():
        user_serializer.save()
      else:
        return Response({
          'message': 'Hay errores en la actualización',
          'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Actualiza los datos del doctor
    doctor_serializer = self.serializer_class(doctor, data=request.data, context={'request': request})
    if doctor_serializer.is_valid():
      doctor_serializer.save()
      return Response({
        'message': 'Doctor actualizado correctamente'
      }, status=status.HTTP_200_OK)
    else:
      return Response({
        'message': 'Hay errores en la actualización',
        'errors': doctor_serializer.errors
      }, status=status.HTTP_400_BAD_REQUEST)
      
  def destroy(self, request, pk=None):
    """
    Elimina un doctor.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El identificador del doctor.

    Returns:
        Response: La respuesta que contiene el resultado de la eliminación.
    """
    doctor = self.get_queryset().filter(id=pk).first()
    if doctor:
      user = doctor.user
      if user:
        doctor.state = False
        doctor.save()
        user.is_active = False
        user.save()
            
        return Response({
          'message': 'Doctor eliminado correctamente.'
        }, status=status.HTTP_200_OK)
      
    return Response({
      'message': 'No se ha encontrado el doctor.'
    }, status=status.HTTP_400_BAD_REQUEST)
    
  @action(detail=True, methods=['put'])
  def activate(self, request, pk=None):
    """
    Activa un doctor.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El identificador del doctor.

    Returns:
        Response: La respuesta que contiene el resultado de la activación.
    """
    doctor = self.get_object(pk)
    if doctor:
      user = doctor.user
      if user:
        doctor.state = True
        doctor.save()
        user.is_active = True
        user.save()
            
        return Response({
          'message': 'Doctor activado correctamente.'
        }, status=status.HTTP_200_OK)
    
    return Response({
      'message': 'No se ha encontrado el doctor.'
    }, status=status.HTTP_400_BAD_REQUEST)