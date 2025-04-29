from django import forms
from .models import UserEmail

from django.utils.translation import gettext_lazy as _

from django.conf import settings

class EmailForm(forms.ModelForm):
    class Meta:
        model = UserEmail
        fields = ['email']
        error_messages = {
            'email': {
                'invalid': _('Введена електронна адреса має некоректний формат. Будь ласка, перевірте правильність вводу.'),
                "unique": _("Ця пошта вже успішно записана.")
            }
        }
        widgets = {
            'email': forms.EmailInput(attrs={
                'class': 'email-input', 
                'placeholder': _('example@email.com')
            })
        }
