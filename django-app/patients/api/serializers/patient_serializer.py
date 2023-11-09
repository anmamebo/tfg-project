from rest_framework import serializers

# from users.api.serializers.user_serializer import UserSerializer
from patients.api.serializers.address_serializer import AddressSerializer
from patients.models import Patient


class PatientSerializer(serializers.ModelSerializer):
  # user = UserSerializer(read_only=True)
  address = AddressSerializer(read_only=True)
  
  class Meta:
    model = Patient
    exclude = ['state', 'created_date', 'modified_date', 'deleted_date']