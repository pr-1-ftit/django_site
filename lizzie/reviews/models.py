import re
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _

def validate_name(value):
    """
    Перевіряє, що ім’я:
    • не порожнє (не складається лише з пробілів);
    • має мінімум 2 символи;
    • містить лише літери (як латиницю, так і кирилицю), пробіли, апострофи та дефіси.
    
    Якщо знайдено декілька помилок, вони всі повертаються одночасно.
    """
    errors = []
    cleaned_value = value.strip()

    if not cleaned_value:
        errors.append(
            ValidationError(
                _('Ім’я не може бути порожнім.'),
                code='empty_name'
            )
        )
    else:
        if len(cleaned_value) < 2:
            errors.append(
                ValidationError(
                    _('Ім’я повинно містити принаймні 2 символи.'),
                    code='invalid_length'
                )
            )
        if not re.fullmatch(r"[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]+", cleaned_value):
            errors.append(
                ValidationError(
                    _('Ім’я може містити лише літери, пробіли, апострофи та дефіси.'),
                    code='invalid_characters'
                )
            )
    
    if errors:
        raise ValidationError(errors)
    
    return cleaned_value

def validate_text(value):
    """
    Перевіряє, що текст відгуку:
    • не є порожнім або не складається лише з пробілів;
    • має мінімум 10 значущих символів;
    • містить хоча б один алфавітний символ (латинський чи кириличний).
    
    Якщо знайдено декілька помилок, вони всі повертаються одночасно.
    """
    errors = []
    cleaned_value = value.strip()
    
    if not cleaned_value:
        errors.append(
            ValidationError(
                _('Текст відгуку не може бути порожнім.'),
                code='empty_text'
            )
        )
    else:
        if len(cleaned_value) < 10:
            errors.append(
                ValidationError(
                    _('Текст відгуку повинен містити щонайменше 10 символів.'),
                    code='too_short'
                )
            )
        if not re.search(r'[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]', cleaned_value):
            errors.append(
                ValidationError(
                    _('Текст відгуку повинен містити хоча б один символ з алфавіту.'),
                    code='no_alphabet'
                )
            )
    
    if errors:
        raise ValidationError(errors)
    
    return cleaned_value

class Reviews(models.Model):
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
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.name} - {self.rating}"

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"
        ordering = ['-created_at']
