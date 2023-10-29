import os
import stripe

from company.models import *
from service.models import *

from django.db import models
from django.contrib.auth.models import User

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

class Purchase(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    company = models.ForeignKey(to=Company, on_delete=models.CASCADE)
    service = models.ForeignKey(to=Service, on_delete=models.CASCADE)
    url = models.URLField(max_length=2000, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    
    def __str__(self) -> str:
        return f"[{self.user.username}/{self.company.title}] {self.service.title}"
    
    class Meta:
        verbose_name = "Purchase"
        verbose_name_plural = "Purchases"
        
    def save(self, *args, **kwargs):
        url = stripe.checkout.Session.create(
            line_items=[
                {
                    "price_data": {
                        "currency": "bgn",
                        "product_data": {
                            "name": self.service.title,
                        },
                        "unit_amount": int(self.service.price * 100)
                    },
                    "quantity": 1
                }
            ],
            mode="payment",
            success_url=os.environ.get("SUCCESS_URL"),
            cancel_url=os.environ.get("CANCEL_URL")
        ).url
        print(url)
        self.url = url
        super().save(*args, **kwargs)