# accounts/serializers.py
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class CustomUsernameRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(required=True)

    def validate_username(self, username):
        if User.objects.filter(username__iexact=username).exists():
            raise serializers.ValidationError("A udssdgser with that username already exists.")
        return username

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['username'] = self.validated_data.get('username', '')
        return data
