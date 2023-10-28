from .models import *
from .serializers import *
from .permissions import *

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        elif self.action in ["create"]:
            return [IsAuthenticated()]
        else:
            return [IsOwnerOrReadOnly()]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, company=serializer.validated_data.get("company"))

    def perform_update(self, serializer):
        serializer.save(user=self.get_object().user)

    def perform_destroy(self, instance):
        instance.delete()
