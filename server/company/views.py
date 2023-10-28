from .models import Company
from .serializers import CompanySerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework import viewsets, filters, generics
from rest_framework.permissions import IsAuthenticated

class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    filter_backends = [filters.SearchFilter] 
    search_fields = ["title", "email"]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
