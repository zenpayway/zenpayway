from .models import *
from .serializers import *
from .permissions import *

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwner]
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    