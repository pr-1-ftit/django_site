from django.urls import path

from . import views

from .views import ReviewDetailView, ReviewListCreate

from django.urls import path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Документація API",
        default_version='v1',
        description="Інтерактивна документація API для вашого проєкту",
        terms_of_service="https://www.example.com/terms",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    
    path('api/v1/reviews/', ReviewListCreate.as_view(), name='reviews_list_create'),
    path('api/v1/reviews/<int:pk>/', ReviewDetailView.as_view(), name='review_detail'),

    path('reviews/', views.reviews_view, name='reviews'),

    path('reviews_add/', views.reviews_add_view),



    # Повернення документації у форматі JSON або YAML
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    # Інтерфейс Swagger-UI
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # Інтерфейс Redoc
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
