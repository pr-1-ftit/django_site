# lizapp/views.py
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

# Сторінка AI Kit
def ai_kit_view(request):
    return render(request, 'ai_kit.html')

# Сторінка Services
def services_view(request):
    return render(request, 'services.html')

# Сторінка Updates
def updates_view(request):
    return render(request, 'updates.html')

# Сторінка Tech News
def tech_news_view(request):
    return render(request, 'tech_news.html')

# Сторінка Support
def support_view(request):
    return render(request, 'support.html')

# Сторінка Resources
def resources_view(request):
    return render(request, 'resources.html')

# Сторінка Premium
def premium_view(request):
    return render(request, 'premium.html')

# Сторінка Premium
def more_view(request):
    return render(request, 'more.html')

# Сторінка Premium
def login_view(request):
    return render(request, 'login.html')

# Сторінка Premium
def signup_view(request):
    return render(request, 'signup.html')

# Сторінка Premium
def community_view(request):
    return render(request, 'community.html')

# Сторінка Premium
def cookies_view(request):
    return render(request, 'cookies.html')

# Сторінка Premium
def about_us_view(request):
    return render(request, 'about_us.html')

# Сторінка Premium
def faq_view(request):
    return render(request, 'faq.html')

# Сторінка Premium
def support_view(request):
    return render(request, 'support.html')

# Сторінка Premium
def resources_view(request):
    return render(request, 'resources.html')

# Сторінка Premium
def settings_view(request):
    return render(request, 'settings.html')