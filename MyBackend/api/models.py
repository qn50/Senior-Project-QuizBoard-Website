from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    num_of_quizzes = models.IntegerField(default=0)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name="courses")

    def __str__(self):
        return self.course_name


class Quize(models.Model):
    Quize_id = models.AutoField(primary_key=True)
    Quize_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    course_name = models.CharField(max_length=100)

    def __str__(self):
        return self.Quize_name
