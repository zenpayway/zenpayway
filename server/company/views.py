from .models import Company
from .serializers import CompanySerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework import viewsets, filters, generics
from rest_framework.permissions import IsAuthenticated

class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = CompanySerializer
    filter_backends = [filters.SearchFilter] 
    search_fields = ["title", "email"]
    
    def get_queryset(self):
        return Company.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
