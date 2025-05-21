import json
from channels.generic.websocket import AsyncWebsocketConsumer
from common.bot_utils import get_bot_response  # Функція для роботи з Ollama

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Фіксована назва групи (єдина кімната)
        self.room_group_name = "global_chat"

        # Приєднуємо клієнта до групи
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Видаляємо клієнта з групи
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        user_message = data.get("message")

        # Тепер не отримуємо username від запиту – завжди використовуємо "guest"
        user_name = "guest"

        # Розсилаємо повідомлення від користувача всім учасникам групи
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": user_message,
                "username": user_name,
            }
        )

        # Отримуємо відповідь від Ollama через бізнес-логіку
        bot_response = await get_bot_response(user_message)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": bot_response,
                "username": "bot",
            }
        )

    async def chat_message(self, event):
        message = event["message"]
        username = event["username"]

        await self.send(
            text_data=json.dumps({
                "message": message,
                "username": username,
            })
        )
