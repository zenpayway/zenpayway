from .models import *
from .serializers import *
from .permissions import *

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        elif self.action in ["create"]:
            return [IsAuthenticated()]
        else:
            return [IsOwnerOrReadOnly()]
    
    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            company=serializer.validated_data.get("company"),
            service=serializer.validated_data.get("service"),
        )
