from django import forms
from .models import Reviews
from django.utils.translation import gettext_lazy as _


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Reviews
        fields = ['name', 'text', 'rating']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': "Ім’я користувача...",
                'class': "name-container placeholder-text",
                'id': "username",
            }),
            'text': forms.Textarea(attrs={
                'placeholder': "Залиште своє враження від нашої роботи тут...",
                'class': "review-input placeholder-text",
                'id': "feedback",
                'rows': 4,
                'cols': 50,
            }),
            # Рейтинг буде прихованим, тому що в шаблоні ми реалізуємо його кастомізовано,
            # напр., через SVG-іконки
            'rating': forms.HiddenInput(attrs={
                'id': "rating",
            }),
        }
        error_messages = {
            'name': {
                'required': _("Поле 'Ім’я' є обов'язковим."),
            },
            'text': {
                'required': _("Поле 'Текст' є обов'язковим."),
            },
            'rating': {
                'required': _("Поле 'Рейтинг' є обов'язковим."),
                'invalid': _("Введіть коректне значення для рейтингу."),
            },
        }


