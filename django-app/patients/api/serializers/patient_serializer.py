from rest_framework import serializers

from patients.api.serializers.address_serializer import AddressSerializer
from patients.models import Patient


class PatientSerializer(serializers.ModelSerializer):
  user = serializers.SerializerMethodField(read_only=True)
  address = AddressSerializer(read_only=True)
  
  class Meta:
    model = Patient
    exclude = ['created_date', 'modified_date', 'deleted_date']
    
  def get_user(self, obj):
    user = obj.user
    return {
      'id': user.id,
      'username': user.username,
      'email': user.email,
      'name': user.name,
      'last_name': user.last_name,
    }