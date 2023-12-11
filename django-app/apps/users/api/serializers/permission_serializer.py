from django.contrib.auth.models import Permission
from rest_framework import serializers


class PermissionSerializer(serializers.ModelSerializer):
    content_type = serializers.StringRelatedField(source="content_type.model")

    class Meta:
        model = Permission
        fields = "__all__"
