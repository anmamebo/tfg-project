from django.utils import timezone
from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from users.models import User
from users.api.serializers.user_serializer import CustomTokenObtainPairSerializer, CustomUserSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


class Login(TokenObtainPairView):
  """
  Vista para iniciar sesión y obtener tokens de acceso.
  
  Esta vista permite a los usuarios autenticarse y obtener tokens de acceso y de actualización
  para su uso posterior en las solicitudes autenticadas.

  Attributes:
    serializer_class (Serializer): El serializador para representar los datos de inicio de sesión.
  
  Permissions:
    No se requieren permisos específicos para acceder a esta vista.
  """
  
  serializer_class = CustomTokenObtainPairSerializer
  
  def post(self, request, *args, **kwargs):
    """
    Inicia sesión y obtiene tokens de acceso y de actualización.

    Args:
        request (Request): La solicitud HTTP que contiene el nombre de usuario y contraseña para la autenticación.

    Returns:
        Response: La respuesta que contiene los tokens de acceso y de actualización y los datos del usuario o los errores.
    """
    username = request.data.get('username', '')
    password = request.data.get('password', '')
    user = authenticate(username=username, password=password) # authenticate retorna el usuario si la autenticación es exitosa, de lo contrario retorna None
    
    if user:
      login_serializer = self.serializer_class(data=request.data)
      if login_serializer.is_valid():
        
        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])
        
        user_serializer = CustomUserSerializer(user)
        return Response({
          'token': login_serializer.validated_data.get('access'),
          'refresh_token': login_serializer.validated_data.get('refresh'),
          'user': user_serializer.data,
          'message': 'Inicio de sesión exitoso'
        }, status=status.HTTP_200_OK)
      
      return Response({
        'message': 'Contraseña o nombre de usuario incorrectos',
      }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({
        'message': 'Contraseña o nombre de usuario incorrectos',
      }, status=status.HTTP_400_BAD_REQUEST)
    
class Logout(GenericAPIView):
  """
  Vista para cerrar sesión y revocar tokens de acceso.
  
  Esta vista permite a los usuarios cerrar sesión y revocar sus tokens de acceso, lo que impide que se realicen
  solicitudes autenticadas en su nombre.

  Attributes:
    No se requieren atributos específicos para esta vista.
  """

  def post(self, request, *args, **kwargs):
    """
    Cierra sesión y revoca los tokens de acceso.

    Args:
        request (Request): La solicitud HTTP que contiene el ID del usuario para cerrar sesión.

    Returns:
        Response: La respuesta que indica sí la sesión se ha cerrado correctamente o si ha habido errores.
    """
    user = User.objects.filter(id=request.data.get('user', 0)) # Recupera el usuario por su ID
    if user.exists():
      RefreshToken.for_user(user.first()) # Revoca los tokens de acceso del usuario
      return Response({
        'message': 'Sesión cerrada correctamente'
      }, status=status.HTTP_200_OK)
    
    return Response({
        'message': 'No existe este usuario'
      }, status=status.HTTP_400_BAD_REQUEST)