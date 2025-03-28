from django.urls import path
from .views import home, account_view, signup_view, login_view

urlpatterns = [
    path('', home, name='home'),
    path('account/', account_view, name='account'),
    path('account/signup/', signup_view, name='signup'),
    path('account/login/', login_view, name='login'),
]
