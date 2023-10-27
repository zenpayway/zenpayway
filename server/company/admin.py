from .models import *
from django.contrib import admin

admin.site.site_header = "ZenPayway"

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("title", "email", "user")
    list_filter = ("created", "updated")
    search_fields = ("title", "email", "user__username")
