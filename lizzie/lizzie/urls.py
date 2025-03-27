# lizzie/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('lizapp.urls')),  # Include urls from lizapp
]
