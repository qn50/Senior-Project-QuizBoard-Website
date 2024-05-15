from torch.optim import AdamW
import torch
import torch.nn as nn
from transformers import AutoModel, AdamW, get_linear_schedule_with_warmup
import pytorch_lightning as pl

# import torch.nn.functional as F
# import torch.optim as optim
# from sklearn.model_selection import train_test_split
# from torch.utils.data import Dataset, DataLoader
# from transformers import PreTrainedTokenizer
# from torch.utils.data import random_split
# import matplotlib.pyplot as plt
# from torchvision import models,transforms
# from torchvision.utils import make_grid
# from torch.utils.data.sampler import SubsetRandomSampler
# from torch.utils.tensorboard import SummaryWriter
# from torchsummary import summary
# from transformers import BertTokenizer
# from transformers import AutoTokenizer

# from torchmetrics.functional import accuracy

class QuestionDifficultyClassifier(pl.LightningModule):
    def __init__(self, config: dict):
        super().__init__()
        self.config = config
        # Load a pre-trained model for classification
        self.pretrained_model = AutoModel.from_pretrained(config['model_name'])
        # Linear layer for classification
        self.classifier = nn.Linear(self.pretrained_model.config.hidden_size, config['n_classes'])
        # Initialize weights for stability
        torch.nn.init.xavier_uniform_(self.classifier.weight)
        # CrossEntropyLoss for classification
        self.loss_func = nn.CrossEntropyLoss()

    def forward(self, input_ids, attention_mask, labels=None):
        # Forward pass through pre-trained model
        outputs = self.pretrained_model(input_ids=input_ids, attention_mask=attention_mask)
        # Use the pooled output for classification tasks
        pooled_output = outputs.pooler_output
        logits = self.classifier(pooled_output)

        loss = 0
        if labels is not None:
            loss = self.loss_func(logits, labels)
        return loss, logits

    def compute_accuracy(self, logits, labels):
        preds = torch.argmax(logits, dim=1)
        correct = torch.eq(preds, labels).float()
        acc = correct.mean()
        return acc

    def training_step(self, batch, batch_idx):
        input_ids = batch['input_ids']
        attention_mask = batch['attention_mask']
        labels = batch['labels']
        loss, logits = self(input_ids, attention_mask, labels)
        acc = self.compute_accuracy(logits, labels)
        self.log("T_loss", loss, prog_bar=True, logger=True)
        self.log("T_acc", acc, prog_bar=True, logger=True)
        return loss

    def validation_step(self, batch, batch_idx):
        input_ids = batch['input_ids']
        attention_mask = batch['attention_mask']
        labels = batch['labels']
        loss, logits = self(input_ids, attention_mask, labels)
        acc = self.compute_accuracy(logits, labels)
        self.log("V_loss", loss, prog_bar=True, logger=True)
        self.log("V_acc", acc, prog_bar=True, logger=True)
        return loss

    def configure_optimizers(self):
        # Configure optimizer and scheduler for training
        optimizer = AdamW(self.parameters(), lr=self.config['lr'], weight_decay=self.config['weight_decay'])
        scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=self.config['warmup_steps'], num_training_steps=self.config['total_steps'])
        return [optimizer], [scheduler]