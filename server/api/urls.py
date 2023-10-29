from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("auth.urls")),
    path("companies/", include("company.urls")),
    path("services/", include("service.urls")),
    path("purchases/", include("purchase.urls"))
]
