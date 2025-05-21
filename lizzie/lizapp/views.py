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

def services_view(request):
    return render(request, 'pages/services.html')



# Представлення для URL /services/ обробляє як GET, так і POST


