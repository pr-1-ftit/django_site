from django.db import models
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _
import uuid
from datetime import timedelta

from .validators import validate_name, validate_text

class Review(models.Model):
    name = models.CharField(
        "Ім’я",
        max_length=12,
        validators=[validate_name],
    )
    text = models.TextField(
        "Текст",
        max_length=5000,
        validators=[validate_text],
    )
    rating = models.PositiveIntegerField(
        "Рейтинг",
        
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, verbose_name="Дата та час оновлення")
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=False)

    def __str__(self):
        return f"{self.name} - {self.rating}"

    @property
    def was_updated(self):
        """
        Повертає True, якщо поле updated більше, ніж created_at 
        щонайменше на одну секунду, що означає, що відгук реально оновлювався.
        """
        return (self.updated - self.created_at) > timedelta(seconds=1)

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"
        ordering = ['-created_at']
