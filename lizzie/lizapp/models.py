from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)  # Заголовок поста
    content = models.TextField()  # Вміст поста
    created_at = models.DateTimeField(auto_now_add=True)  # Дата створення
    updated_at = models.DateTimeField(auto_now=True)  # Дата оновлення

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"
        ordering = ['-created_at']  # Сортування за датою (спочатку новіші)