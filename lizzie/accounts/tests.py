# accounts/tests.py
import re
import json

from django.core import mail
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class RegistrationEmailLoginTest(APITestCase):
    def test_registration(self):
        """
        Тест реєстрації:
         - Надсилаємо POST запит на /api/auth/registration/ з даними користувача.
         - Перевіряємо, що користувача створено і статус відповіді 200 або 201.
         - Перевіряємо, що було відправлено лист із підтвердженням.
        """
        registration_url = '/api/auth/registration/'
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password1": "StrongPassword1!",
            "password2": "StrongPassword1!"
        }
        response = self.client.post(registration_url, data, format="json")
        self.assertIn(response.status_code, [200, 201],
                      f"Registration failed: {response.content.decode()}")
        
        # Перевіряємо, що лист відправлено
        self.assertEqual(len(mail.outbox), 1, "Лист не відправлено")
        confirmation_email = mail.outbox[0]
        self.assertIn("account-confirm-email", confirmation_email.body, 
                      "Посилання для підтвердження не знайдено в тілі листа")
    
    def test_email_confirmation(self):
        """
        Тест підтвердження електронної пошти:
         - Реєструємо користувача.
         - З листа для підтвердження витягуємо ключ підтвердження.
         - Симулюємо запит для підтвердження email.
         - Перевіряємо, що статус відповіді 200.
        """
        registration_url = '/api/auth/registration/'
        data = {
            "username": "confirmuser",
            "email": "confirm@example.com",
            "password1": "StrongPassword1!",
            "password2": "StrongPassword1!"
        }
        response = self.client.post(registration_url, data, format="json")
        self.assertIn(response.status_code, [200, 201],
                      f"Registration failed: {response.content.decode()}")
        self.assertEqual(len(mail.outbox), 1, "Лист підтвердження не відправлено")
        email_body = mail.outbox[0].body

        # Витягуємо confirmation key із листа; посилання виглядає як:
        # /api/auth/registration/account-confirm-email/<key>/
        match = re.search(r'/api/auth/registration/account-confirm-email/([^/]+)/', email_body)
        self.assertIsNotNone(match, "Confirmation key не знайдено в листі")
        confirmation_key = match.group(1)

        # Симулюємо GET запит на підтвердження email
        confirm_url = f'/api/auth/registration/account-confirm-email/{confirmation_key}/'
        confirm_response = self.client.get(confirm_url)
        self.assertEqual(
            confirm_response.status_code, 200,
            f"Email confirmation failed: {json.loads(confirm_response.content)}"
        )
    
    def test_login(self):
        """
        Тест входу:
         - Реєструємо користувача.
         - Підтверджуємо його email.
         - Надсилаємо POST запит для входу.
         - Перевіряємо, що в відповіді міститься токен.
        """
        registration_url = '/api/auth/registration/'
        user_data = {
            "username": "loginuser",
            "email": "login@example.com",
            "password1": "StrongPassword1!",
            "password2": "StrongPassword1!"
        }
        reg_response = self.client.post(registration_url, user_data, format="json")
        self.assertIn(reg_response.status_code, [200, 201],
                      f"Registration failed: {reg_response.content.decode()}")

        # Підтвердження email
        self.assertEqual(len(mail.outbox), 1, "Лист для підтвердження не відправлено")
        email_body = mail.outbox[0].body
        match = re.search(r'/api/auth/registration/account-confirm-email/([^/]+)/', email_body)
        self.assertIsNotNone(match, "Confirmation key не знайдено в листі")
        confirmation_key = match.group(1)
        confirm_url = f'/api/auth/registration/account-confirm-email/{confirmation_key}/'
        confirm_response = self.client.get(confirm_url)
        self.assertEqual(
            confirm_response.status_code, 200,
            f"Email confirmation failed: {json.loads(confirm_response.content)}"
        )

        # Спроба входу
        login_url = '/api/auth/login/'
        login_data = {
            "username": "loginuser",
            "password": "StrongPassword1!"
        }
        login_response = self.client.post(login_url, login_data, format="json")
        self.assertEqual(
            login_response.status_code, 200,
            f"Login failed: {json.loads(login_response.content)}"
        )
        # Тут припускаємо, що відповідь містить токен у полі "key"
        self.assertIn("key", login_response.data if hasattr(login_response, "data") else json.loads(login_response.content),
                      "Токен не знайдено в відповіді після входу")
