from .models import *
from .serializers import *
from .permissions import *

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class PurchaseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwner]
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
