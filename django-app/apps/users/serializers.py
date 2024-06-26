from apps.doctors.serializers import DoctorSerializer
from apps.groups.serializers import GroupSerializer
from apps.patients.serializers import PatientSerializer
from apps.users.models import User
from django.contrib.auth.hashers import check_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Toma la estructura del modelo para convertirlo en JSON
# ObjecetSerializer(object, many=True) -> Lista de objetos
# ObjecetSerializer(object) -> Objeto
# ObjectSerializer(data=request.data) -> Crear objeto
# ObjectSerializer(object, data=request.data) -> Actualizar objeto
# ObjectSerializer(object, partial=True) -> Actualizar objeto parcialmente
# ObjectSerializer(object, instance=object) -> Actualizar objeto
# ObjectSerializer(object, instance=object, partial=True) -> Actualizar objeto parcialmente
# ObjectSerializer(object, instance=object, data=request.data) -> Actualizar objeto
# ObjectSerializer(object, instance=object, data=request.data, partial=True) -> Actualizar objeto parcialmente

# serializer.ModelSerializer -> Crea un serializer a partir de un modelo

# serializer.Serializer -> Crea un serializer a partir de un objeto
# name = serializers.CharField(max_length=100)
# last_name = serializers.CharField(max_length=100)
# email = serializers.EmailField()

# Si se quiere validar un campo se debe crear un método validate_<field_name>
# def validate_name(self, value):
#   if value == 'admin':
#     raise serializers.ValidationError('El nombre no puede ser admin')
#   return value

# Si no existe un método validate_<field_name> se puede usar el método (en validate se pueden validar varios campos)
# def validate(self, data):
#   if data['name'] == 'admin':
#     raise serializers.ValidationError('El nombre no puede ser admin')
#   return data

# Si en una validación se quiere usar un campo que no es de esa validacion se debe pasar el context en el serializer y usar this.context['field_name']

# Para que el metodo create se ejecute hay que llamar al metodo .save() del serializer

# Para actualizar se usa el metodo update, que recibe el objeto a actualizar y los datos a actualizar

# El metodo save() del serializer se puede usar cuando queremos usar el serializer para validaciones y no para crear o actualizar un objeto (ej: validar un email)

# El metodo to_representation se usa para modificar la representación del objeto en el serializer (ej: cambiar el nombre de un campo)
# En el representation para acceder a los valores se usa . si en la consulta se usa all() y se usa [] si en la consulta se usa values()

# Para campos relacionados se puede usar el nombre de la relacion y usar su serializer (ej: user = UserSerializer())
# Tambien se puede usar StringRelatedField() para mostrar el valor del campo relacionado usando el metodo __str__ del modelo relacionado
# Se puede usar el metodo to_representation para modificar la representación del campo relacionado (ej: instance.user.name)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer para agregar datos personalizados al token.
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token["username"] = user.username
        token["email"] = user.email
        token["groups"] = list(user.groups.all().values_list("name", flat=True))
        return token


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Custom serializer para agregar datos personalizados al usuario.
    """

    class Meta:
        model = User
        fields = ("id", "username", "email", "name", "last_name", "profile_picture")


class UserSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un usuario.

    Este serializador maneja la representación de los datos de un usuario.

    Args:
        validated_data (dict): Datos validados para la representación del usuario.

    Returns:
        dict: Diccionario con los datos del usuario.
    """

    # Ejemplo de acceder a datos de una relación 1 a 1
    # dni = serializers.CharField(source='patient.dni')
    # Si hay un serializer se podria hacer asi
    patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    # groups = serializers.StringRelatedField(many=True, source='groups.name')
    groups = GroupSerializer(many=True, read_only=True)
    # groups = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class UpdateUserSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de la actualización de un usuario.

    Este serializador maneja la representación de los datos de la actualización de un usuario.

    Args:
        validated_data (dict): Datos validados para la representación de la actualización del usuario.

    Returns:
        dict: Diccionario con los datos de la actualización del usuario.
    """

    class Meta:
        model = User
        fields = ("username", "email", "name", "last_name", "profile_picture")


class PasswordSerializer(serializers.Serializer):
    """
    Serializador para representar los datos de la actualización de la contraseña de un usuario.

    Este serializador maneja la representación de los datos de la actualización de la contraseña de un usuario.

    Args:
        validated_data (dict): Datos validados para la representación de la actualización de la contraseña del usuario.

    Returns:
        dict: Diccionario con los datos de la actualización de la contraseña del usuario.
    """

    old_password = serializers.CharField(max_length=128, min_length=1, write_only=True)
    password = serializers.CharField(max_length=128, min_length=1, write_only=True)
    password2 = serializers.CharField(max_length=128, min_length=1, write_only=True)

    def validate(self, data):
        user = self.context["request"].user

        # Validar que la contraseña actual sea correcta
        if not check_password(data["old_password"], user.password):
            raise serializers.ValidationError(
                {"old_password": "La contraseña actual no es correcta"}
            )

        if data["password"] != data["password2"]:
            raise serializers.ValidationError(
                {"password": "Debe ingresar ambas contraseñas iguales"}
            )
        return data


class UserListSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de la lista de usuarios.

    Este serializador maneja la representación de los datos de la lista de usuarios.

    Args:
        validated_data (dict): Datos validados para la representación de la lista de usuarios.

    Returns:
        dict: Diccionario con los datos de la lista de usuarios.
    """

    class Meta:
        model = User

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "name": instance.name,
            "last_name": instance.last_name,
            "username": instance.username,
            "email": instance.email,
            "is_active": instance.is_active,
            "groups": instance.groups.all().values_list(
                "name", flat=True
            ),  # flat=True para que devuelva una lista de valores en vez de una lista de tuplas
        }


class UserProfilePictureSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de la actualización de la imagen de perfil de un usuario.

    Este serializador maneja la representación de los datos de la actualización de la imagen de perfil de un usuario.

    Args:
        validated_data (dict): Datos validados para la representación de la actualización de la imagen de perfil del usuario.

    Returns:
        dict: Diccionario con los datos de la actualización de la imagen de perfil del usuario.
    """

    class Meta:
        model = User
        fields = ("profile_picture",)


class EmptySerializer(serializers.Serializer):
    """
    Serializer vacío.

    Este serializer se usa cuando no se necesita un serializer.
    """

    pass
