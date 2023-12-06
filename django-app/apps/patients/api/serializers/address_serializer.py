from rest_framework import serializers

from apps.patients.models import Address


class AddressSerializer(serializers.ModelSerializer):  
  class Meta:
    model = Address
    exclude = ['state', 'created_date', 'modified_date', 'deleted_date']
    
  