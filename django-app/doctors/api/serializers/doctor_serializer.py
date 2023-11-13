from rest_framework import serializers

from doctors.models import Doctor

class DoctorSerializer(serializers.ModelSerializer):
  user = serializers.SerializerMethodField(read_only=True)
  departments = serializers.SerializerMethodField(read_only=True)
  
  class Meta:
    model = Doctor
    exclude = ['state', 'created_date', 'modified_date', 'deleted_date']
    
  def get_user(self, obj):
    user = obj.user
    return {
      'id': user.id,
      'username': user.username,
      'email': user.email,
      'name': user.name,
      'last_name': user.last_name,
    }
    
  def get_departments(self, obj):
    departments = obj.departments
    return [{
      'id': department.id,
      'name': department.name,
    } for department in departments.all()]
    
class DoctorInDepartmentListSerializer(serializers.ModelSerializer):
  user = serializers.SerializerMethodField(read_only=True)
  
  class Meta:
    model = Doctor
    exclude = ['departments', 'state', 'created_date', 'modified_date', 'deleted_date']
    
  def get_user(self, obj):
    user = obj.user
    return {
      'id': user.id,
      'username': user.username,
      'email': user.email,
      'name': user.name,
      'last_name': user.last_name,
    }