# Generated by Django 5.0.4 on 2024-05-06 15:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quize',
            name='course_name',
            field=models.ForeignKey(default=None, max_length=100, on_delete=django.db.models.deletion.SET_DEFAULT, to='api.course'),
        ),
    ]
