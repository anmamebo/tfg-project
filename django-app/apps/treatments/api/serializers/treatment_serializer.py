from rest_framework import serializers

from apps.treatments.models import Treatment


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


class TreatmentListSerializer(serializers.ModelSerializer):
    """
    Serializador para representar los datos de una lista de tratamientos.

    Este serializador maneja la representación de los datos de una lista de tratamientos.

    Args:
        validated_data (dict): Datos validados para la representación de la lista de tratamientos.

    Returns:
        dict: Diccionario con los datos de la lista de tratamientos.
    """

    class Meta:
        model = Treatment
        exclude = ["created_date", "modified_date", "deleted_date"]
