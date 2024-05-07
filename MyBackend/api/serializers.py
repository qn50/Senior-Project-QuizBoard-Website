from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Course, Quize

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user



class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["course_id", "course_name", "created_at", "num_of_quizzes", "teacher"]
        extra_kwargs = {"teacher": {"read_only": True}}

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quize
        fields = ["Quize_id", "Quize_name", "created_at", "course_id"]
        extra_kwargs = {"course_id": {"read_only": True}}

#class createCourseSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Course
#        fields = '__all__'


#class QuizeSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Quize
#        fields = '__all__'


#class createQuizeSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Quize
#        fields = ['Quize_name', 'course_name']
