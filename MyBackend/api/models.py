from django.db import models

# Create your models here.


class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.course_name


class Quize(models.Model):
    Quize_id = models.AutoField(primary_key=True)
    Quize_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    course_name = models.CharField(max_length=100)

    def __str__(self):
        return self.Quize_name
