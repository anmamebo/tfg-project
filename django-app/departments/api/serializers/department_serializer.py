from rest_framework import serializers

from departments.models import Department


class DepartmentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Department
    exclude = ['state', 'created_date', 'modified_date', 'deleted_date']