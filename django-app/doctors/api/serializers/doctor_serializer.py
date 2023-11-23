from django.contrib.auth.models import Group

from rest_framework import serializers

from doctors.models import Doctor, MedicalSpecialty
from users.models import User
from departments.models import Department



class UserDoctorSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = User
    fields = '__all__'
  
  def create(self, validated_data):
    user = User(**validated_data)
    user.set_password(validated_data['password'])
    user.save()
    return user


class CreateDoctorSerializer(serializers.ModelSerializer):
  user = UserDoctorSerializer()
  departments = serializers.PrimaryKeyRelatedField(many=True, queryset=Department.objects.all(), required=False)
  medical_specialties = serializers.PrimaryKeyRelatedField(many=True, queryset=MedicalSpecialty.objects.all(), required=False)
  
  class Meta:
    model = Doctor
    exclude = ['created_date', 'modified_date', 'deleted_date']

  def create(self, validated_data):
    user_data = validated_data.pop('user', None)
    departments_data = validated_data.pop('departments', None)
    medical_specialties_data = validated_data.pop('medical_specialties', None)
    
    if user_data:
      user_serializer = UserDoctorSerializer(data=user_data)
      if user_serializer.is_valid():
        user = user_serializer.save()
        
        group_name = 'Médico'
        group, created = Group.objects.get_or_create(name=group_name)
        user.groups.add(group)
        
        doctor = Doctor.objects.create(user=user, **validated_data)
        
        if departments_data:
          for department in departments_data:
            doctor.departments.add(department)
            
        if medical_specialties_data:
          for medical_specialty in medical_specialties_data:
            doctor.medical_specialties.add(medical_specialty)
        
        return doctor
      else:
        raise serializers.ValidationError({'user': user_serializer.errors})

class DoctorSerializer(serializers.ModelSerializer):
  user = serializers.SerializerMethodField(read_only=True)
  departments = serializers.SerializerMethodField(read_only=True)
  medical_specialties = serializers.SerializerMethodField(read_only=True)
  
  class Meta:
    model = Doctor
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
    
  def get_departments(self, obj):
    departments = obj.departments
    return [{
      'id': department.id,
      'name': department.name,
    } for department in departments.all()]
    
  def get_medical_specialties(self, obj):
    medical_specialties = obj.medical_specialties
    return [{
      'id': medical_specialty.id,
      'name': medical_specialty.name,
    } for medical_specialty in medical_specialties.all()]
    
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