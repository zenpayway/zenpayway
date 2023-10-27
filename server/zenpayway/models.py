from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator


class User(AbstractUser):
    STATUS = (
        ("Company", "Company"),
        ("Client", "Client")
    )
    
    id = models.UUIDField(primary_key=True, default=uuid4(), editable=False)
    status = models.CharField(max_length=7, choices=STATUS)
    pass

    def __str__(self) -> str:
        return self.username


class Service(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid4(), editable=False)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
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