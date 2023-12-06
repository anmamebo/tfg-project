from rest_framework import serializers

from apps.doctors.models import MedicalSpecialty


class MedicalSpecialtySerializer(serializers.ModelSerializer):
  class Meta:
    model = MedicalSpecialty
    exclude = ['state', 'created_date', 'modified_date', 'deleted_date']