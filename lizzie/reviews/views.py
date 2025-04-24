

from django.shortcuts import render, redirect
from django.views.generic import ListView
from .forms import ReviewForm
from .models import Reviews
import hashlib
import random

# Міксін для обробки відгуків
class ReviewsMixin:
    def process_reviews(self, reviews):
        for review in reviews:
            review.range_rating = range(review.rating)
            review.range_remaining = range(5 - review.rating)
            review.avatar_color = self.generate_color(review.name)
        return reviews

    @staticmethod
    def generate_color(name):
        hash_object = hashlib.md5(name.encode('utf-8'))
        hex_digest = hash_object.hexdigest()
        return f"#{hex_digest[:6]}"

    @staticmethod
    def generate_random_color():
        return "#{:06x}".format(random.randint(0, 0xFFFFFF))


from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage




from django.core.paginator import EmptyPage
from django.views.generic import ListView

from django.core.paginator import EmptyPage
from django.http import HttpResponseRedirect
from django.views.generic import ListView

class ReviewsListView(ReviewsMixin, ListView):
    model = Reviews
    template_name = 'reviews/reviews.html'
    context_object_name = 'reviews'
    paginate_by = 12

    def get(self, request, *args, **kwargs):
        """
        Перевірка коректності параметра 'page' у запиті.
        Якщо в URL вказано значення сторінки менше 1 або більше максимальної,
        виконуємо редірект на URL з правильним номером сторінки.
        """
        # Отримуємо значення параметра 'page', за замовчуванням 1
        page_str = request.GET.get('page', '1')
        try:
            page_number = int(page_str)
        except (ValueError, TypeError):
            page_number = 1

        # Отримуємо queryset та створюємо пагінатор
        queryset = self.get_queryset()
        paginator = self.get_paginator(queryset, self.paginate_by, allow_empty_first_page=True)

        # Визначаємо коректний номер сторінки
        if page_number < 1:
            valid_page = 1
        elif page_number > paginator.num_pages:
            valid_page = paginator.num_pages
        else:
            valid_page = page_number

        # Якщо номер сторінки некоректний – виконуємо редірект на правильний URL
        if valid_page != page_number:
            query_params = request.GET.copy()
            query_params['page'] = valid_page
            new_url = f"{request.path}?{query_params.urlencode()}"
            return HttpResponseRedirect(new_url)

        return super().get(request, *args, **kwargs)

    def paginate_queryset(self, queryset, page_size):
        """
        Використовуємо власну логіку пагінації:
          - Перетворюємо значення параметра 'page' у число;
          - Якщо значення менше 1 – встановлюємо 1;
          - Якщо номер сторінки перевищує допустимий – повертаємо останню сторінку.
        """
        paginator = self.get_paginator(queryset, page_size, allow_empty_first_page=True)
        page = self.request.GET.get(self.page_kwarg, 1)
        try:
            page_number = int(page)
        except (ValueError, TypeError):
            page_number = 1
        if page_number < 1:
            page_number = 1
        try:
            page_obj = paginator.page(page_number)
        except EmptyPage:
            page_obj = paginator.page(paginator.num_pages)
        return (paginator, page_obj, page_obj.object_list, page_obj.has_other_pages())

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Обробка списку відгуків через метод process_reviews (логіка обробки може бути довільною)
        context[self.context_object_name] = self.process_reviews(context[self.context_object_name])
        return context
