from apps.doctors.models import MedicalSpecialty
from rest_framework import serializers


class MedicalSpecialtySerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de una especialidad médica.

    Este serializador maneja la representación de los datos de una especialidad médica,
    incluyendo información sobre el nombre.

    Args:
        validated_data (dict): Datos validados para la representación de la especialidad médica.

    Returns:
        dict: Diccionario con los datos de la especialidad médica.
    """

    class Meta:
        model = MedicalSpecialty
        exclude = ["created_date", "modified_date", "deleted_date"]


class MedicalSpecialtyStatisticsSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de una especialidad médica con estadísticas.

    Este serializador maneja la representación de los datos de una especialidad médica,
    incluyendo información sobre el nombre y la cantidad de doctores.

    Args:
        validated_data (dict): Datos validados para la representación de la especialidad médica con estadísticas.

    Returns:
        dict: Diccionario con los datos de la especialidad médica con estadísticas.
    """

    doctor_count = serializers.IntegerField(source="doctor_set.count")

    class Meta:
        model = MedicalSpecialty
        fields = ["name", "doctor_count"]
