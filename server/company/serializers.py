from .models import *
from rest_framework import serializers


class CompanySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Company
        exclude = ("user",)