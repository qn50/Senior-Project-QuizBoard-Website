from django.urls import path
from . import views

urlpatterns = [
    path("courses/", views.CourseListCreate.as_view(), name="course-list"),
    path("courses/delete/<int:pk>/", views.CourseDelete.as_view(), name="delete-course"),

    path('quizzes/', views.QuizeListView, name='quize-list'),
    path('quizzes/create', views.createQuizeView, name='create-quize'),
]
