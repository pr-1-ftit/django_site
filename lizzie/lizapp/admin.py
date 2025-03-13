from django.contrib import admin
from .models import Post  # Імпортуйте модель Post

class PostAdmin(admin.ModelAdmin):
    pass  # Ваші налаштування адміністрування

admin.site.register(Post, PostAdmin)