# Generated by Django 4.2.6 on 2023-10-27 16:48

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('zenpayway', '0002_alter_service_id_alter_user_id_alter_user_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='id',
            field=models.UUIDField(default=uuid.UUID('0810de39-91f4-4ae3-b843-59ecc8ab64dc'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.UUIDField(default=uuid.UUID('9363173d-ca39-498c-a216-f6da44a7627a'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.CharField(choices=[('Company', 'Company'), ('Client', 'Client')], max_length=7),
        ),
    ]
