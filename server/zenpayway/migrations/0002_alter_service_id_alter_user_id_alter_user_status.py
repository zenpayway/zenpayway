# Generated by Django 4.2.6 on 2023-10-27 15:01

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('zenpayway', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='id',
            field=models.UUIDField(default=uuid.UUID('2395895f-78eb-424b-b289-94202a605aad'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.UUIDField(default=uuid.UUID('21d14a81-f946-40c9-b55f-7b3a8c493587'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.CharField(choices=[('Administrator', 'Administrator'), ('Company', 'Company'), ('Client', 'Client')], max_length=13),
        ),
    ]
