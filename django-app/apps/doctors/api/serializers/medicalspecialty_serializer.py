from apps.doctors.models import MedicalSpecialty
from rest_framework import serializers


class MedicalSpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty
        exclude = ["state", "created_date", "modified_date", "deleted_date"]
