import requests
import openai
import docx
import PyPDF2
import os
from .load_model import get_model
from django.http import JsonResponse
from rest_framework.views import APIView
from transformers import AutoTokenizer
import torch
import json

def getChatGPT_response(file, numEasy, numMedium, numHard):
    # Set your OpenAI API key
    openai.api_key = "sk-proj-I6WyEqcu7dXvMN5ns3DbT3BlbkFJoT9eFROTYCai4YN8Dmzz"
    # Set the OpenAI API endpoint
    api_url = "https://api.openai.com/v1/chat/completions"

    # Set the model, user message, and temperature
    model = "gpt-3.5-turbo"
    user_message = ""

    # user_message = "Football, also known as soccer in some parts of the world, is a sport that captivates the hearts of millions across the globe. It is a game that transcends boundaries, cultures, and languages, bringing people together in a shared passion for the beautiful game."
    # "At its core, football is a sport played between two teams, each consisting of eleven players, who strive to score goals by maneuvering the ball into the opponent's net. The objective is simple, yet the game itself is filled with nuance, strategy, and skill."
    # "Football is more than just a game; it is a spectacle that ignites emotions and creates unforgettable moments. The roar of the crowd, the skillful dribbles, the precise passes, and the thunderous strikes all contribute to the excitement and drama that unfold on the pitch. From the grassroots level to the grandest stages of international tournaments, football has the power to captivate fans and transcend mere entertainment."
    # "The sport has produced legendary players who have become household names and icons of the game. From Pelé to Diego Maradona, Johan Cruyff to Lionel Messi, and Cristiano Ronaldo to Neymar, these remarkable athletes have showcased their extraordinary abilities, inspiring generations of players and fans alike."
    # "Football has the ability to unite people from diverse backgrounds, fostering a sense of camaraderie and community. Whether it's supporting a local team, cheering for a national squad, or engaging in friendly banter with rival fans, football has a way of bringing people together, creating shared experiences, and building lasting friendships."
    # "Beyond its impact on individuals, football has the power to shape societies and transcend social barriers. It serves as a platform for promoting social causes, raising awareness on important issues, and fostering inclusivity. Through initiatives like Football for Peace, Kick It Out, and Common Goal, the sport is used as a vehicle for positive change, promoting equality, diversity, and social justice."
    # "Football's global appeal is evident in the magnitude of international competitions such as the FIFA World Cup, the UEFA Champions League, and the Copa America. These tournaments attract billions of viewers worldwide, showcasing the pinnacle of talent, teamwork, and passion in the sport."
    # "From the breathtaking goals to the nail-biting penalty shootouts, football has a way of evoking emotions unlike any other sport. It has the power to make fans leap with joy, shed tears of both happiness and despair, and feel a sense of belonging to something greater than themselves."
    # "In conclusion, football is not just a game; it's a universal language that speaks to the hearts of millions. Its ability to inspire, unite, and entertain is unparalleled. Whether you're a player, a fan, or simply an admirer of the sport, football continues to capture our imagination and remind us of the extraordinary power of the beautiful game."

    temperature = 0.2

    # Set headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai.api_key}"
    }

    def check_file_type(file_path):
        _, file_extension = os.path.splitext(file_path)
        if file_extension.lower() == '.pdf':
            return 'pdf'
        elif file_extension.lower() in ('.docx', '.doc'):
            return 'word'
        else:
            return 'unknown'


    def extract_text_from_word(docx_path):
        text = ''
        doc = docx.Document(docx_path)
        for paragraph in doc.paragraphs:
            text += paragraph.text + '\n'
        return text


    def extract_text_from_pdf(pdf_path):
        text = ''
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += page.extract_text()
        return text


    file_path = file
    file_type = check_file_type(file_path)
    print(f"The file is of type: {file_type}")
    if (file_type == "word"):
        user_message = extract_text_from_word(file_path)
    elif (file_type == "pdf"):
        user_message = extract_text_from_pdf(file_path)
    elif (file_type == "unknown"):
        user_message = "unknown"
        print("the file must be .pdf or .docx\n\n\n")


    # Prepare the data payload
    data = {
        "model": model,
        "messages": [
            {"role": "user", "content": "Can you generate Multiple-choice questions for the exam based on the lecture content?"},

            {"role": "user", "content": user_message},

            {"role": "user", "content": "make sure that each class have the same number of questions"},

            {"role": "assistant",
                "content": "generate 30 multiple choices questions and classify the questions generated based on the depth of knowledge required, the complexity of the concepts involved, and the level of detail needed to provide a comprehensive answer to one of this three class(Easy, Medium, and Hard) And write the number of question, question, options, answer, and the difficulty class for each question and only return the json object"},

        ],
        "temperature": temperature
    }

    # Make the API request
    response = requests.post(api_url, headers=headers, json=data)
  

    #-----------------------------classification Model-----------------------------------------------------------------------------
    # Load the model once when the server starts
    net = get_model()  
    # Set model to evaluation mode
    net.eval()
    # Initialize tokenizer
    tokenizer = AutoTokenizer.from_pretrained('roberta-base')


    # Process the response
    if response.status_code == 200:

        generated_completion = response.json()['choices'][0]['message']['content']
        # Parse the JSON string into a Python dictionary
        questions_dict = json.loads(generated_completion)
        #print(f"questions_dict: {questions_dict}")
        easy_questions = []
        medium_questions = []
        hard_questions = []

        easy_questions_details = []
        medium_questions_details = []
        hard_questions_details = []
        
        easy_count = 0
        medium_count = 0
        hard_count = 0

        for question in questions_dict['questions']:
            test_encoding = tokenizer.encode_plus(
                question['question'],
                add_special_tokens=True,
                max_length=128,
                return_token_type_ids=False,
                padding='max_length',
                truncation=True,
                return_attention_mask=True,
                return_tensors='pt'
            )
            # Prepare input for the model
            test_input = {
                'input_ids': test_encoding['input_ids'].to(net.device),
                'attention_mask': test_encoding['attention_mask'].to(net.device)
            }
            # Predict using the model
            with torch.no_grad():
                 _, logits = net(**test_input)  # Adjust based on your model's specific output
            
            # Determine predicted class
            predicted_class = torch.argmax(logits, dim=1).item()
            difficulty_mapping = {0: 'easy', 1: 'medium', 2: 'hard'}
            predicted_difficulty = difficulty_mapping[predicted_class]

            # Determine the correct list to append based on difficulty
            if predicted_difficulty == "easy" and easy_count < numEasy:
                easy_questions_details.append({
                    'question': question['question'],
                    'options': question['options'],
                    'answer': question['answer'],
                    'difficulty': question['difficulty']
                })
                easy_questions.append({
                    'question': question['question'],
                    'options': question['options']
                })
                easy_count += 1
            elif predicted_difficulty == "medium" and medium_count < numMedium:
                medium_questions_details.append({
                    'question': question['question'],
                    'options': question['options'],
                    'answer': question['answer'],
                    'difficulty': question['difficulty']
                })
                medium_questions.append({
                    'question': question['question'],
                    'options': question['options']
                })
                medium_count += 1
            elif predicted_difficulty == "hard" and hard_count < numHard:
                hard_questions_details.append({
                    'question': question['question'],
                    'options': question['options'],
                    'answer': question['answer'],
                    'difficulty': question['difficulty']
                })
                hard_questions.append({
                    'question': question['question'],
                    'options': question['options']
                })
                hard_count += 1
        
        all_questions = {
        'hard_questions': hard_questions,
        'medium_questions': medium_questions,
        'easy_questions': easy_questions
        }

        all_questions_details = {
            'hard_questions_details': hard_questions_details,
            'medium_questions_details': medium_questions_details,
            'easy_questions_details': easy_questions_details
        }
        # Paths for the PDF files
        questions_file_path = 'questions.pdf'
        questions_details_file_path = 'questions_details.pdf'

        # Generate PDF files
        generate_pdf(questions_file_path, all_questions)
        generate_pdf2(questions_details_file_path, all_questions_details)

        # Return file paths as a JSON response (if this is in a Django view)
        return {
            'questions_file': questions_file_path,
            'questions_details_file': questions_details_file_path
        }
    
    else:
        print('Error:', response.status_code, response.text)

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import textwrap

def generate_pdf(file_path, data):
    c = canvas.Canvas(file_path, pagesize=letter)
    width, height = letter  # Get the dimensions of the page

    # Starting coordinates for the first item
    x = 72
    y = height - 72

    for difficulty, questions in data.items():
        c.setFont("Helvetica-Bold", 14)
        c.drawString(x, y, f"{difficulty.capitalize()}:")
        y -= 24  # Move down to start listing questions

        c.setFont("Helvetica", 12)
        for question in questions:
            question_text = question['question']
            options = question['options']
            # Display the question
            question_lines = textwrap.wrap(question_text, width=90)  # Wrap text if it's too long
            for line in question_lines:
                if y < 72:  # Check if the space is enough to continue on this page
                    c.showPage()
                    y = height - 72
                    c.setFont("Helvetica", 12)
                c.drawString(x, y, line)
                y -= 18

            # Display the options
            for option_label, option_text in options.items():
                option_line = f"{option_label}: {option_text}"
                option_lines = textwrap.wrap(option_line, width=90)
                for line in option_lines:
                    if y < 72:
                        c.showPage()
                        y = height - 72
                        c.setFont("Helvetica", 12)
                    c.drawString(x + 10, y, line)  # Indent options for clarity
                    y -= 18

            y -= 18  # Extra space before next question

        y -= 36  # Extra space before next section

    c.save()

def generate_pdf2(file_path, data):
    c = canvas.Canvas(file_path, pagesize=letter)
    width, height = letter  # Get the dimensions of the page

    # Starting coordinates for the first item
    x = 72
    y = height - 72

    for difficulty, questions in data.items():
        c.setFont("Helvetica-Bold", 14)
        c.drawString(x, y, f"{difficulty.capitalize()}:")
        y -= 24  # Move down to start listing questions

        c.setFont("Helvetica", 12)
        for question in questions:
            # Display the question
            question_text = question['question']
            question_lines = textwrap.wrap(question_text, width=90)  # Wrap text if it's too long
            for line in question_lines:
                if y < 72:  # Check if the space is enough to continue on this page
                    c.showPage()
                    y = height - 72
                c.drawString(x, y, line)
                y -= 18

            # Display the options
            options = question['options']
            for option_label, option_text in options.items():
                option_line = f"{option_label}: {option_text}"
                option_lines = textwrap.wrap(option_line, width=90)
                for line in option_lines:
                    if y < 72:
                        c.showPage()
                        y = height - 72
                    c.drawString(x + 10, y, line)  # Indent options for clarity
                    y -= 18

            # Display the answer
            answer_text = f"Answer: {question['answer']}"
            answer_lines = textwrap.wrap(answer_text, width=90)
            for line in answer_lines:
                if y < 72:
                    c.showPage()
                    y = height - 72
                c.drawString(x, y, line)
                y -= 18

            # Display the difficulty
            difficulty_text = f"Difficulty: {question['difficulty']}"
            if y < 72:
                c.showPage()
                y = height - 72
            c.drawString(x, y, difficulty_text)
            y -= 24  # Extra space before next question

        y -= 36  # Extra space before next section

    c.save()