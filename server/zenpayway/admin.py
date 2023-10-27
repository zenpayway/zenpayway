from .models import *
from django.contrib import admin

admin.site.site_header = "ZenPayway"
    
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "first_name", "last_name", "email", "status")
    list_filter = ("status",)
    search_fields = ("username", "first_name", "last_name", "email")
    
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "price")
    list_filter = ("created", "updated")
    search_fields = ("title", "user__username")