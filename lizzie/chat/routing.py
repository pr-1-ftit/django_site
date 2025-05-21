# from django.urls import path

# from .consumers import WSConsumer


# ws_urlpatterns = [
#     path('ws/somechat/', WSConsumer.as_asgi())
# ]




# chat/routing.py
from django.urls import path
from . import consumers

ws_urlpatterns = [
    path('ws/chat/', consumers.ChatConsumer.as_asgi()),
]
