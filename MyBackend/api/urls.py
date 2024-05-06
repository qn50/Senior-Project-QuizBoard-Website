from django.urls import path
from . import views

urlpatterns = [
    path('courses/', views.CourseListView, name='course-list'),
    path('courses/create', views.createCourseView, name='create-course'),
    path('quizzes/', views.QuizeListView, name='quize-list'),
    path('quizzes/create', views.createQuizeView, name='create-quize'),
]
