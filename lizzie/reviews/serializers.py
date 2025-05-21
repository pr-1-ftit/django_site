from rest_framework import serializers
from .models import Review
from .utils import token_valid

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('token',)  # Токен генерується автоматично, тому запис змінюватися не може


class ReviewSerializer(serializers.ModelSerializer):
    can_delete = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = ("id", "name", "text", "rating", 'updated', "can_delete", "was_updated")

    def get_can_delete(self, obj):
        request = self.context.get('request')
        if not request:
            return False
        return token_valid(obj, request)

    def get_was_updated(self, obj):
        return obj.was_updated

