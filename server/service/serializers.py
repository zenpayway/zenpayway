from .models import *

from company.serializers import *

from rest_framework import serializers


class ServiceSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    
    class Meta:
        model = Service
        fields = "__all__"