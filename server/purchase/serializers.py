from .models import *

from company.serializers import *
from service.serializers import *

from rest_framework import serializers


class PurchaseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Purchase
        fields = "__all__"