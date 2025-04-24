from django import forms
from .models import UserEmail

import requests

from django.conf import settings

class EmailForm(forms.ModelForm):
    class Meta:
        model = UserEmail
        fields = ['email']
        error_messages = {
            'email': {
                'invalid': 'Введена електронна адреса має некоректний формат. Будь ласка, перевірте правильність вводу.',
                "unique": "Ця пошта вже успішно записана."
            }
        }
        widgets = {
            'email': forms.EmailInput(attrs={
                'class': 'email-input', 
                'placeholder': 'example@email.com'
            })
        }
