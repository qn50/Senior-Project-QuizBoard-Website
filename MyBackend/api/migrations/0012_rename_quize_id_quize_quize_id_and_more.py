# Generated by Django 5.0.5 on 2024-05-11 08:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_remove_course_num_of_quizzes'),
    ]

    operations = [
        migrations.RenameField(
            model_name='quize',
            old_name='Quize_id',
            new_name='quize_id',
        ),
        migrations.RenameField(
            model_name='quize',
            old_name='Quize_name',
            new_name='quize_name',
        ),
    ]