from django.db import models

# Create your models here.

from django.conf import settings
from django.db import models

class ChatSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='chat_sessions')
    channel = models.CharField(max_length=50, default='web')  # або 'telegram' тощо
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Session {self.id} ({self.channel})"

class Message(models.Model):
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    user_name = models.CharField(max_length=100)  # Ім’я відправника, може бути або username, або 'bot'
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.timestamp}] {self.user_name}: {self.text}"
