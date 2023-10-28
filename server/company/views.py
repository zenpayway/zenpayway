from .models import Company
from .serializers import CompanySerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    filter_backends = [filters.SearchFilter] 
    search_fields = ["title", "email"]
    
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        elif self.action in ["create"]:
            return [IsAuthenticated()]
        else:
            return [IsOwnerOrReadOnly()]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
