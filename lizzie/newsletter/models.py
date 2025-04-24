from django.db import models
import dns.resolver
from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible

import dns.resolver
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

def validate_email_dns(value):
    """
    Валідатор для перевірки електронної пошти через DNS (MX-записи).
    """
    # Перевірка базового формату email
    try:
        validate_email(value)
    except ValidationError:
        raise ValidationError("Невірний формат електронної пошти.")
    
    # Отримання домену з email
    try:
        domain = value.split('@')[1]
    except IndexError:
        raise ValidationError("Невірний формат електронної пошти.")
    
    # Спроба отримати MX записи домену
    try:
        answers = dns.resolver.resolve(domain, 'MX')
        if not answers:
            raise ValidationError("Для вказаного домену не знайдено MX-записів.")
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN):
        raise ValidationError("Домен не містить необхідних MX-записів або не існує.")
    except dns.exception.DNSException as e:
        raise ValidationError(f"Помилка при отриманні DNS-записів: {e}")







class UserEmail(models.Model):
    email = models.EmailField(
        max_length=254, 
        unique=True, 
        verbose_name="Поштова адреса",
        help_text="Введіть дійсну електронну адресу",
        validators=[validate_email_dns]  # додано валідатор
    )
    created_at = models.DateTimeField(
        auto_now_add=True, 
        verbose_name="Дата створення"
    )

    def save(self, *args, **kwargs):
        self.email = self.normalize_email(self.email)
        super().save(*args, **kwargs)

    def normalize_email(self, email):
        """
        Нормалізує email шляхом приведення всієї адреси до нижнього регістру.
        Видалення пробілів не включається, оскільки Django за замовчуванням
        видаляє зайві символи при обробці введення.
        """
        return email.lower()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Користувацька пошта"
        verbose_name_plural = "Користувацькі пошти"
