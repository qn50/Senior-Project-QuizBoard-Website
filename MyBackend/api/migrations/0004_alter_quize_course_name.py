# Generated by Django 5.0.4 on 2024-05-06 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_quize_course_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quize',
            name='course_name',
            field=models.CharField(max_length=100),
        ),
    ]
