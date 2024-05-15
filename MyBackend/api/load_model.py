import torch
from .model_definition import QuestionDifficultyClassifier

def get_model():
    model_path = 'D:/modelWeights/my_model_state_weights.pth'

    # Configuration dictionary for the model
    config = {
        'model_name': 'roberta-base',  # Model identifier
        'n_classes': 3,  # Number of difficulty levels
        'lr': 1e-5,  # Learning rate
        'weight_decay': 0.01,  # Regularization
        'warmup_steps': 100,  # Scheduler warmup steps
        'total_steps': 1633,  # Total training steps
        'batch_size': 32,  # Batch size
        'n_epochs': 16  # Number of epochs
    }

    model = QuestionDifficultyClassifier(config)
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()  # Set model to evaluation mode
    return model