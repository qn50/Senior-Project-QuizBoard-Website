
# Create your tests here.
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Course

class CourseModelTest(TestCase):
    def setUp(self):
        # Create a test teacher
        self.user = get_user_model().objects.create_user(
            email='teacher@example.com',
            password='testpass123',
            role='TEACHER',
            first_name='Test',
            last_name='Teacher'
        )

    def test_course_creation(self):
        # Create a course
        course = Course.objects.create(
            course_name='Introduction to Python',
            teacher=self.user,
            num_of_quizzes=5
        )
        
        # Check if the course was created with the correct details
        self.assertEqual(course.course_name, 'Introduction to Python')
        self.assertEqual(course.teacher, self.user)
        self.assertEqual(course.num_of_quizzes, 5)

    def test_course_teacher_relationship(self):
        # Test the relationship between User and Course
        course1 = Course.objects.create(
            course_name='Data Science Basics',
            teacher=self.user,
            num_of_quizzes=3
        )
        course2 = Course.objects.create(
            course_name='Advanced Machine Learning',
            teacher=self.user,
            num_of_quizzes=4
        )

        self.assertEqual(self.user.courses.count(), 2)