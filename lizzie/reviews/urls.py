from django.urls import path
from .views import ReviewsListView

urlpatterns = [

    path('reviews/', ReviewsListView.as_view(), name='reviews'),  # Якщо потрібна окрема сторінка для відгуків
]
