from .models import *
from django.contrib import admin

admin.site.site_header = "ZenPayway"

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "user", "company")
    list_filter = ("created", "updated")
    search_fields = ("title", "description", "user__username", "company__title")
