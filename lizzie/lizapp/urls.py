# lizapp/urls.py
from django.urls import path
from . import views 



urlpatterns = [
    path('', views.index, name='index'),
    path('ai_kit/', views.ai_kit_view, name='ai_kit'),
    
    path('updates/', views.updates_view, name='updates'),
    path('tech_news/', views.tech_news_view, name='tech_news'),
    path('support/', views.support_view, name='support'),
    path('resources/', views.resources_view, name='resources'),
    path('premium/', views.premium_view, name='premium'),
    path('more/', views.more_view, name='more'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('community/', views.community_view, name='community'),
    path('cookies/', views.cookies_view, name='cookies'),
    path('about_us/', views.about_us_view, name='about_us'),
    path('faq/', views.faq_view, name='faq'),
    path('support/', views.support_view, name='support'),
    path('resources/', views.resources_view, name='resources'),
    path('settings/', views.settings_view, name='settings'),





    path('services/', views.services_view, name='services'),


]
