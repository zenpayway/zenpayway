from company.models import *

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator


class Service(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    company = models.ForeignKey(to=Company, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    
    title = models.CharField(max_length=127, null=False, blank=False)
    description = models.TextField(max_length=4095, null=True, blank=True)
    
    price = models.DecimalField(
        null=False,
        blank=False,
        default=1.00,
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.00)],
    )
    
    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"
