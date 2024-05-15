from django.test import TestCase
from .load_model import get_model
from .GenerateQ import getChatGPT_response
from .views import GenerateQ
import requests
import openai
import docx
import PyPDF2
import os

# class ModelLoadingTest(TestCase):
#     def test_load_model(self):
#         """Test the model loads without errors."""
#         try:
#             model = get_model()
#             self.assertIsNotNone(model)
#             print("Model loaded successfully!")
#         except Exception as e:
#             self.fail(f"Model loading failed with an exception: {e}")

# class generatTest(TestCase):
#     file = "D:/FCIT_Courses_Notability/Semester_6/CPCS241/Chapter03.pdf"
#     getChatGPT_response(file,5,5,5)

from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile

class GenerateQTests(APITestCase):
    def setUp(self):
        # Setup any initial data or state before each test is run
        self.url = reverse('chatgpt_api')  # Ensure you have named your URL pattern correctly

    def test_generate_q_with_valid_pdf(self):
        
        # Test the GenerateQ view with a valid PDF file
        file_content = "D:/FCIT_Courses_Notability/Semester_6/CPCS241/Chapter03.pdf"
        #test_file = SimpleUploadedFile("test_file.pdf", file_content, content_type="application/pdf")

        data = {
            'file': file_content,
            'numEasy': 5,
            'numMedium': 5,
            'numHard': 5
        }

        response = self.client.post(self.url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add more assertions here to validate the response content

