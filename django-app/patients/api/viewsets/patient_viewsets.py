from django.db.models import Q
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from patients.models import Patient
from patients.api.serializers.patient_serializer import PatientSerializer
from users.api.serializers.user_serializer import UserSerializer


class PatientViewSet(viewsets.GenericViewSet):
  """
  Vista para gestionar pacientes.

  Esta vista permite realizar operaciones CRUD para pacientes.

  Attributes:
    model (Model): El modelo de paciente a gestionar.
    serializer_class (Serializer): El serializador para representar los datos del paciente.
    list_serializer_class (Serializer): El serializador para representar los datos de una lista de pacientes.
    queryset (QuerySet): El conjunto de datos que se utilizará para las consultas.
  """
  
  model = Patient
  serializer_class = PatientSerializer
  list_serializer_class = PatientSerializer
  queryset = None
  
  # Recupera el objeto basado en el identificador en la URL
  def get_object(self, pk):
    return get_object_or_404(self.model, pk=pk)
  
  # Define el conjunto de datos que se utilizará para las consultas
  def get_queryset(self):
    if self.queryset is None:
      self.queryset = self.model.objects\
                      .filter(state=True)\
                      .all()
    return self.queryset
  
  def list(self, request):
    """
    Lista todos los pacientes.

    Args:
        request (Request): La solicitud HTTP.

    Returns:
        Response: La respuesta que contiene la lista de pacientes.
    """
    patients = self.get_queryset()
    
    query = self.request.query_params.get('search', None)
    
    if query:
      patients = patients.filter(
        Q(user__name__icontains=query) | Q(user__last_name__icontains=query) | Q(dni__icontains=query) | 
        Q(user__email__icontains=query) | Q(social_security__icontains=query) | Q(phone__icontains=query)
      )
      
    page = self.paginate_queryset(patients)
    if page is not None:
      patients_serializer = self.list_serializer_class(page, many=True)
      return self.get_paginated_response(patients_serializer.data)
    else:
      patients_serializer = self.list_serializer_class(patients, many=True)
      return Response(patients_serializer.data, status=status.HTTP_200_OK)
  
  def retrieve(self, request, pk=None):
    """
    Recupera los detalles de un paciente específico.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El ID del paciente.

    Returns:
        Response: La respuesta que contiene los detalles del paciente o un mensaje de error si no tiene permisos.
    """
    patient = self.get_object(pk)
    patient_serializer = self.serializer_class(patient)
    return Response(patient_serializer.data)

  def update(self, request, pk=None):
    """
    Actualiza los detalles de un paciente existente.

    Args:
        request (Request): La solicitud HTTP.
        pk (int): El ID del paciente.

    Returns:
        Response: La respuesta que indica si el paciente se ha actualizado correctamente o si ha habido errores.
    """
    patient = self.get_object(pk)
    
    # Actualiza los datos del usuario en caso de que se hayan enviado
    user_data = request.data.pop('user', None)
    if user_data:
      user_serializer = UserSerializer(patient.user, data=user_data, partial=True)
      if user_serializer.is_valid():
        user_serializer.save()
      else:
        return Response({
          'message': 'Hay errores en la actualización',
          'errors'  : user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Actualiza los datos del paciente
    patient_serializer = self.serializer_class(patient, data=request.data, context={'request': request}, partial=True)
    if patient_serializer.is_valid():
      patient_serializer.save()
      return Response({
        'message': 'Paciente actualizado correctamente'
      }, status=status.HTTP_200_OK)
    
    return Response({
      'message': 'Hay errores en la actualización',
      'errors'  : patient_serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)