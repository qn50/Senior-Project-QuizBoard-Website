from .models import Course, Quize, Files
from .serializers import UserSerializer, CourseSerializer, QuizSerializer
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from django.http import JsonResponse
from .load_model import get_model

class QuizListCreate(generics.ListCreateAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        course_id = self.request.query_params.get('course_id', None)

        if course_id is None or course_id.lower() == 'null':
            # No specific course_id provided, return all quizzes related to user
            user = self.request.user
            return Quize.objects.filter(course_id__teacher=user)
        try:
            course_id = int(course_id)  # Attempt to convert to integer
        except ValueError:
            return Response({'error': 'course_id must be an integer'}, status=status.HTTP_400_BAD_REQUEST)
        return Quize.objects.filter(course_id=course_id)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class QuizDelete(generics.DestroyAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Quize.objects.all()


class CourseListCreate(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Course.objects.filter(teacher=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(teacher=self.request.user)
        else:
            print(serializer.errors)


class CourseDelete(generics.DestroyAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Course.objects.filter(teacher=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .GenerateQ import getChatGPT_response  


class GenerateQ(APIView):
    permission_classes = [AllowAny]  
          
    def post(self, request, *args, **kwargs):
        # You might want to pass the file and other parameters via request.data *******M******
        file = "D:/FCIT_Courses_Notability/Semester_6/CPCS241/Chapter03.pdf"
        numEasy = 5
        numMedium = 5
        numHard = 5

        # Assuming file is being handled correctly (you may need to handle file uploads)
        response_data = getChatGPT_response(file, numEasy, numMedium, numHard)
        return Response(response_data, status=status.HTTP_200_OK)
