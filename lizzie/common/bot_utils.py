# common/bot_utils.py
import aiohttp
import asyncio

async def get_bot_response(user_message, prompt_prefix=""):
    # Формуємо запит до Ollama. Якщо заданий prompt_prefix, додаємо його до запиту.
    if prompt_prefix:
        full_prompt = f"{prompt_prefix}\nПитання: {user_message}\nВідповідь:"
    else:
        full_prompt = user_message

    # Використовується endpoint, який обслуговує POST-запити до API Ollama
    api_url = "http://localhost:11434/api/chat"

    # Додаємо обов'язковий параметр "model" та передаємо вхідні дані користувача як повідомлення
    payload = {
        "model": "llama3.2:1b",  # Назва вашої моделі
        "messages": [{"role": "user", "content": user_message}],
        "stream": False,
        "temperature": 0.8,
        "max_tokens": 150,  # Налаштування за потребою
    }
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(api_url, json=payload) as response:
                text = await response.text()
                print("Сирий текст відповіді:", text)
                if response.status == 200:
                    # Встановлюємо content_type=None для автодекодування NDJSON (якщо потрібно)
                    data = await response.json(content_type=None)
                    # print("Повний JSON:", data)
                    # Витягуємо текст відповіді з message.content
                    return data.get("message", {}).get("content", "Відповідь не отримана")
                else:
                    return f"Помилка: {response.status}. Текст відповіді: {text}"
    except Exception as e:
        return f"Помилка: {str(e)}"
