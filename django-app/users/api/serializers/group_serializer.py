from django.contrib.auth.models import Group

from rest_framework import serializers

class GroupSerializer(serializers.ModelSerializer):
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