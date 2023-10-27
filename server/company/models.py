from django.db import models
from django.contrib.auth.models import User


class Company(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    
    title = models.CharField(max_length=127, null=False, blank=False)
    email = models.EmailField(max_length=127, null=False, blank=False)
    
    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"
    