from apps.doctors.models import MedicalSpecialty
from rest_framework import serializers


class MedicalSpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty
        exclude = ["state", "created_date", "modified_date", "deleted_date"]


class MedicalSpecialtyStatisticsSerializer(serializers.ModelSerializer):
    doctor_count = serializers.IntegerField(source="doctor_set.count")

    class Meta:
        model = MedicalSpecialty
        fields = ["name", "doctor_count"]
