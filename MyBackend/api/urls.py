from django.urls import path
from . import views
from .views import GenerateQ

urlpatterns = [
    path("courses/", views.CourseListCreate.as_view(), name="course-list"),
    path("courses/delete/<int:pk>/", views.CourseDelete.as_view(), name="delete-course"),
    path("quizzes/", views.QuizListCreate.as_view(), name='quize-list'),
    path("quizzes/delete/<int:pk>/", views.QuizDelete.as_view(), name='delete-quize'),
    path('chatgpt/', views.GenerateQ.as_view(), name='chatgpt_api'),
]
