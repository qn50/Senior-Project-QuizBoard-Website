from .models import Course, Quize
from .serializers import UserSerializer, CourseSerializer, QuizSerializer
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny


class QuizListCreate(generics.ListCreateAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Quize.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class QuizDelete(generics.DestroyAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        course = self.request.Course
        return Quize.objects.filter(course_id=course)


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

# @api_view()
# def CourseListView(request):
#    queryset = Course.objects.all()
#    serializer = CourseSerializer(queryset, many=True)
#    return Response(serializer.data)


# @api_view(['POST'])
# def createCourseView(request):
#    if request.method == 'POST':
#        serializer = CourseSerializer(data=request.data)
#        serializer.is_valid(raise_exception=True)
#        serializer.save()
#        return Response(serializer.data, status=status.HTTP_201_CREATED)


# @api_view()
# def QuizeListView(request):
#    queryset = Quize.objects.all()
#    serializer = QuizeSerializer(queryset, many=True)
#    return Response(serializer.data)


# @api_view(['POST'])
# def createQuizeView(request):
#    if request.method == 'POST':
#        serializer = createQuizeSerializer(data=request.data)
#        serializer.is_valid(raise_exception=True)
#        serializer.save()
#        return Response(serializer.data.get('course_name'), status=status.HTTP_201_CREATED)


# class CourseList(generics.ListAPIView):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializer
#     http_method_names = ['get']


# @api_view(['POST'])
# def create_course(request):
#     if request.method == 'POST':
#         print(request.data)
#         course_name = request.POST.get('courseName')
#         # Assuming you have a Course model defined
#         course = Course(course_name=course_name)
#         course.save()
#         return Response({'message': 'Course created successfully!'})
#     else:
#         return Response({'error': 'Invalid request method'}, status=400)


# @api_view(['POST'])
# def create_quize(request):
#     if request.method == 'POST':
#         course_name = request.POST.get('courseName')
#         # Assuming you have a Course model defined
#         course = Course(course_name=course_name)
#         course.save()
#         return Response({'message': 'Course created successfully!'})
#     else:
#         return Response({'error': 'Invalid request method'}, status=400)
