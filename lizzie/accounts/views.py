from allauth.account.views import ConfirmEmailView
from django.http import JsonResponse, Http404

class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, request, *args, **kwargs):
        try:
            # Спроба отримати об'єкт підтвердження
            self.object = self.get_object()
        except Http404:
            return JsonResponse({"detail": "Confirmation object not found"}, status=404)

        try:
            # Викликаємо метод підтвердження
            self.object.confirm(request)
        except Exception as e:
            # У випадку помилки повертаємо JSON з описом проблеми
            return JsonResponse({"detail": "Confirmation failed", "error": str(e)}, status=400)
        
        # У разі успішного підтвердження повертаємо відповідь
        return JsonResponse({"detail": "Email confirmed successfully"})
