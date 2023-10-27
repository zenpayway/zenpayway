from .models import *

from company.serializers import *
from service.serializers import *

from rest_framework import serializers


class PurchaseSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    service = ServiceSerializer()
    
    class Meta:
        model = Purchase
        exclude = ("user",)