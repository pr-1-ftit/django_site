# lizapp/views.py
from django.shortcuts import render, redirect
from django.views.generic.base import View



from django.views.generic import ListView

import random
import hashlib

def index(request):
    return render(request, 'pages/index.html')

# Сторінка AI Kit
def ai_kit_view(request):
    return render(request, 'pages/ai_kit.html')

# Сторінка Updates
def updates_view(request):
    return render(request, 'pages/updates.html')

# Сторінка Tech News
def tech_news_view(request):
    return render(request, 'pages/tech_news.html')

# Сторінка Support
def support_view(request):
    return render(request, 'pages/support.html')

# Сторінка Resources
def resources_view(request):
    return render(request, 'pages/resources.html')

# Сторінка Premium
def premium_view(request):
    return render(request, 'pages/premium.html')

# Сторінка Premium
def more_view(request):
    return render(request, 'pages/more.html')

# Сторінка Premium
def login_view(request):
    return render(request, 'pages/login.html')

# Сторінка Premium
def signup_view(request):
    return render(request, 'pages/signup.html')

# Сторінка Premium
def community_view(request):
    return render(request, 'pages/community.html')

# Сторінка Premium
def cookies_view(request):
    return render(request, 'pages/cookies.html')

# Сторінка Premium
def about_us_view(request):
    return render(request, 'pages/about_us.html')

# Сторінка Premium
def faq_view(request):
    return render(request, 'pages/faq.html')

# Сторінка Premium
def support_view(request):
    return render(request, 'pages/support.html')

# Сторінка Premium
def resources_view(request):
    return render(request, 'pages/resources.html')

# Сторінка Premium
def settings_view(request):
    return render(request, 'pages/settings.html')


from reviews.forms import ReviewForm
from newsletter.forms import EmailForm
from reviews.models import Reviews
from reviews.views import ReviewsMixin

# Представлення для URL /services/ обробляє як GET, так і POST

class ServicesListView(ReviewsMixin, ListView):
    model = Reviews
    template_name = 'pages/services.html'
    context_object_name = 'reviews'
    
    def get_queryset(self):
        # Отримуємо 4 останні відгуки
        return Reviews.objects.order_by('-id')[:4]
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Додаємо форму відгуків, якщо вона не передана
        if 'form' not in kwargs:
            context['form'] = ReviewForm()
        # Додаємо форму для email, якщо вона не передана
        if 'email_form' not in kwargs:
            context['email_form'] = EmailForm()
        context[self.context_object_name] = self.process_reviews(context[self.context_object_name])
        return context

    def post(self, request, *args, **kwargs):
        # Якщо була надіслана форма email
        if "email_submit" in request.POST:
            email_form = EmailForm(request.POST)
            if email_form.is_valid():
                email_form.save()
                return redirect('services')
            else:
                # Перед формуванням контексту встановлюємо object_list, щоб запобігти AttributeError
                self.object_list = self.get_queryset()
                context = self.get_context_data(email_form=email_form)
                return self.render_to_response(context)
        else:
            # Обробка форми відгуків
            review_form = ReviewForm(request.POST)
            if review_form.is_valid():
                review_form.save()
                return redirect('services')
            else:
                self.object_list = self.get_queryset()
                context = self.get_context_data(form=review_form)
                return self.render_to_response(context)