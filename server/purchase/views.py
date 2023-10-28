from .models import *
from .serializers import *
from .permissions import *

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class PurchaseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwner]
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    
    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            company=serializer.validated_data.get("company"),
            service=serializer.validated_data.get("service")
        )

    def perform_update(self, serializer):
        serializer.save(user=self.get_object().user)

    def perform_destroy(self, instance):
        instance.delete()
