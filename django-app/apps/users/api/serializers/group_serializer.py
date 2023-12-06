from django.contrib.auth.models import Group

from rest_framework import serializers

from apps.users.api.serializers.permission_serializer import PermissionSerializer


class GroupSerializer(serializers.ModelSerializer):
  permissions = PermissionSerializer(many=True, read_only=True)
  
  class Meta:
    model = Group
    fields = '__all__'

class GroupListSerializer(serializers.ModelSerializer):
  class Meta:
    model = Group
    
  def to_representation(self, instance):
    return {
      'id': instance.id,
      'name': instance.name,
    }