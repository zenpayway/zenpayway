from .views import *
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register("", ServiceViewSet, "services")

urlpatterns = [
    path("", include(router.urls))
]
