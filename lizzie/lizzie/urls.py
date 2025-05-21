from django.contrib import admin
from django.urls import path, include
from accounts.views import CustomConfirmEmailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('lizapp.urls')),
    path('i18n/', include('django.conf.urls.i18n')),
    path('api-auth/', include('rest_framework.urls')),
    path("", include("reviews.urls")), 
    path('accounts/', include('allauth.urls')),
    path('', include('chat.urls')),

    # Підключення кастомного маршруту для підтвердження email
    path('api/auth/registration/account-confirm-email/<str:key>/', 
         CustomConfirmEmailView.as_view(), 
         name='account_confirm_email'),

    # Інші маршрути
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/password/reset/', include('django.contrib.auth.urls')),
]
