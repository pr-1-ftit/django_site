from django.db import models
import dns.resolver
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _

def validate_email_dns(value):
    """
    Валідатор для перевірки електронної пошти через DNS (MX-записи).
    """
    # Перевірка базового формату email
    try:
        validate_email(value)
    except ValidationError:
        raise ValidationError(_("Невірний формат електронної пошти."))
    
    # Отримання домену з email
    try:
        domain = value.split('@')[1]
    except IndexError:
        raise ValidationError(_("Невірний формат електронної пошти."))
    
    # Спроба отримати MX записи домену
    try:
        answers = dns.resolver.resolve(domain, 'MX')
        if not answers:
            raise ValidationError(_("Для вказаного домену не знайдено MX-записів."))
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN):
        raise ValidationError(_("Домен не містить необхідних MX-записів або не існує."))
    except dns.exception.DNSException as e:
        raise ValidationError(_("Помилка при отриманні DNS-записів: %(error)s") % {'error': e})

class UserEmail(models.Model):
    email = models.EmailField(
        max_length=254,
        unique=True,
        verbose_name=_("Поштова адреса"),
        help_text=_("Введіть дійсну електронну адресу"),
        validators=[validate_email_dns]  # додано локалізований валідатор
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Дата створення")
    )

    def save(self, *args, **kwargs):
        self.email = self.normalize_email(self.email)
        super().save(*args, **kwargs)

    def normalize_email(self, email):
        """
        Нормалізує email шляхом приведення всієї адреси до нижнього регістру.
        """
        return email.lower()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _("Користувацька пошта")
        verbose_name_plural = _("Користувацькі пошти")
