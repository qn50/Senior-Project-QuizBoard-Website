from rest_framework import serializers
from .models import Course, Quize


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class createCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class QuizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quize
        fields = '__all__'


class createQuizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quize
        fields = ['Quize_name', 'course_name']
