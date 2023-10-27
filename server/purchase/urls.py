from .views import *
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register("", PurchaseViewSet, "purchases")

urlpatterns = [
    path("", include(router.urls))
]
