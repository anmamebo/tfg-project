from rest_framework import serializers

from doctors.models import Doctor

class DoctorSerializer(serializers.ModelSerializer):
  class Meta:
    model = Doctor
    exclude = ['state', 'created_date', 'modified_date', 'deleted_date']