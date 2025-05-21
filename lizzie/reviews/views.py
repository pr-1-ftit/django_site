from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

from .models import Review
from .serializers import ReviewSerializer, ReviewCreateSerializer
from .services import PaginationReviews


class ReviewCookieMixin:
    """
    Міксін для роботи з кукі, пов’язаними з токеном відгуку.
    """
    def set_review_token_cookie(self, response, review, max_age=None):
        """
        Встановлює кукі з токеном для відгуку.
        :param response: об’єкт відповіді Response
        :param review: створений або оновлений об’єкт Review
        :param max_age: час життя кукі в секундах (опціонально)
        """
        cookie_name = f"review_token_{review.id}"
        cookie_kwargs = {
            "key": cookie_name,
            "value": str(review.token),
            "httponly": True,
            "secure": False,  # Для локальної розробки; на продакшені використовувати secure=True
            "samesite": "Lax",
            "path": "/"
        }
        if max_age is not None:
            cookie_kwargs["max_age"] = max_age
        response.set_cookie(**cookie_kwargs)

    def delete_review_token_cookie(self, response, review):
        """
        Видаляє кукі з токеном для відгуку.
        """
        response.delete_cookie(
            key=f"review_token_{review.id}",
            path='/'
        )

    def get_cookie_token(self, review, request):
        """
        Повертає значення токену з кукі для даного відгуку.
        """
        return request.COOKIES.get(f"review_token_{review.id}")


@method_decorator(cache_page(60 * 15), name='dispatch')  # кешуємо GET-відповіді на 15 хвилин
class ReviewListCreate(ReviewCookieMixin, ListCreateAPIView):
    queryset = Review.objects.all().order_by('-updated')
    pagination_class = PaginationReviews

    def get_serializer_class(self):
        if self.request.method.upper() == 'POST':
            return ReviewCreateSerializer
        return ReviewSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        review = serializer.save()
        headers = self.get_success_headers(serializer.data)
        response = Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        # Розрахунок 50 років у секундах
        max_age_50_years = 50 * 365 * 24 * 60 * 60  
        self.set_review_token_cookie(response, review, max_age=max_age_50_years)
        return response


class ReviewDetailView(ReviewCookieMixin, RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    lookup_field = 'pk'
    http_method_names = ['head', 'get', 'put', 'delete']

    def get_serializer_class(self):
        if self.request.method.upper() == 'PUT':
            return ReviewCreateSerializer
        return ReviewSerializer

    def token_valid(self, review, request):
        cookie_token = self.get_cookie_token(review, request)
        if not cookie_token:
            return False
        return cookie_token == str(review.token)

    def put(self, request, *args, **kwargs):
        """
        Виконує оновлення існуючого відгуку або створює новий,
        якщо відгук не знайдено (логіка upsert).
        """
        try:
            instance = self.get_object()
        except Http404:
            instance = None

        if instance is None:
            # Створення нового відгуку
            serializer = ReviewCreateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            review = serializer.save()
            response = Response(serializer.data, status=status.HTTP_201_CREATED)
            self.set_review_token_cookie(response, review)
        else:
            # Оновлення існуючого відгуку
            serializer = self.get_serializer(instance, data=request.data, partial=False)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            response = Response(serializer.data, status=status.HTTP_200_OK)
            self.set_review_token_cookie(response, instance)
        return response

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()  
        self.perform_destroy(instance)
        response = Response(status=status.HTTP_204_NO_CONTENT)
        self.delete_review_token_cookie(response, instance)
        return response


def reviews_view(request):
    return render(request, 'reviews/reviews.html')


def reviews_add_view(request):
    return render(request, 'reviews/reviews_add.html')
