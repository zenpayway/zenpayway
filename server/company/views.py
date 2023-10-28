from .models import Company
from .serializers import CompanySerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework import viewsets

class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
