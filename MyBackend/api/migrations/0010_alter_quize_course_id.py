# Generated by Django 5.0.5 on 2024-05-07 10:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_quize_course_name_quize_course_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quize',
            name='course_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Quizzes', to='api.course'),
        ),
    ]
