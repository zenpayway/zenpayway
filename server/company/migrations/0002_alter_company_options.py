# Generated by Django 4.2.6 on 2023-10-27 20:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='company',
            options={'verbose_name': 'Company', 'verbose_name_plural': 'Companies'},
        ),
    ]
