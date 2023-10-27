from .models import *

from company.serializers import *

from rest_framework import serializers


class ServiceSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    
    class Meta:
        model = Service
        exclude = ("user",)