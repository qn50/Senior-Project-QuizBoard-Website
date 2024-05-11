from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name="courses")

    def __str__(self):
        return self.course_name


class Quize(models.Model):
    quize_id = models.AutoField(primary_key=True)
    quize_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="Quizzes")

    def __str__(self):
        return self.quize_name
