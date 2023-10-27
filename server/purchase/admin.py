from .models import *
from django.contrib import admin

admin.site.site_header = "ZenPayway"

@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ("user", "company", "service", "url")
    list_filter = ("created", "updated")
    search_fields = ("user__username", "company__title", "service__title", "url")
