from django.urls import path
from django.urls import path, include


urlpatterns = [
    path("", include("newsletter.urls")),
]
