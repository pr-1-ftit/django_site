from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Review

class PaginationReviews(PageNumberPagination):
    page_size = 12
    max_page_size = 1000
    page_size_query_param = 'page_size'

    def get_page_number(self, request, paginator):

        page = request.query_params.get(self.page_query_param, 1)
        try:
            page_number = int(page)
        except (TypeError, ValueError):
            page_number = 1

        if page_number < 1:
            page_number = 1

        if page_number > paginator.num_pages:
            page_number = paginator.num_pages

        return page_number
