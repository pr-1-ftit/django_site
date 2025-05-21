# reviews/permissions.py
from rest_framework.permissions import BasePermission

class IsSuperuser(BasePermission):
    """
    Дозволяє доступ лише користувачам зі статусом суперкористувача (is_superuser=True).
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)
