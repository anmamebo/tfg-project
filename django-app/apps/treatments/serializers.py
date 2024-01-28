from apps.doctors.models import Doctor
from apps.treatments.models import Treatment
from apps.users.models import User
from rest_framework import serializers


class TreatmentSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un tratamiento.

    Este serializador maneja la representación de los datos de un tratamiento.

    Args:
        validated_data (dict): Datos validados para la representación del tratamiento.

    Returns:
        dict: Diccionario con los datos del tratamiento.
    """

    class Meta:
        model = Treatment
        exclude = ["created_date", "modified_date", "deleted_date"]


class UserSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un usuario.

    Este serializador maneja la representación de los datos de un usuario.

    Args:
        validated_data (dict): Datos validados para la representación del usuario.

    Returns:
        dict: Diccionario con los datos del usuario.
    """

    class Meta:
        model = User
        fields = ["name", "last_name", "email"]


class DoctorSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de un doctor.

    Este serializador maneja la representación de los datos de un doctor.

    Args:
        validated_data (dict): Datos validados para la representación del doctor.

    Returns:
        dict: Diccionario con los datos del doctor.
    """

    user = UserSerializer(read_only=True)

    class Meta:
        model = Doctor
        fields = ["user"]


class TreatmentListSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de una lista de tratamientos.

    Este serializador maneja la representación de los datos de una lista de tratamientos.

    Args:
        validated_data (dict): Datos validados para la representación de la lista de tratamientos.

    Returns:
        dict: Diccionario con los datos de la lista de tratamientos.
    """

    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = Treatment
        exclude = ["created_date", "modified_date", "deleted_date"]
