from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Review
import re


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True)
    name = serializers.CharField(max_length=150)

    class Meta:
        model = User
        fields = ['name', 'password', 'confirm_password']

    def validate_name(self, value):
        if not re.match(r'^[А-Яа-яЁё\s]+$', value):
            raise serializers.ValidationError('Имя должно содержать только русские буквы')
        if User.objects.filter(first_name=value).exists():
            raise serializers.ValidationError('Пользователь с таким именем уже существует')
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'Пароли не совпадают'})
        return data

    def create(self, validated_data):
        name = validated_data['name']
        password = validated_data['password']
        user = User.objects.create_user(
            username=name,
            first_name=name,
            password=password
        )
        return user


class LoginSerializer(serializers.Serializer):
    name = serializers.CharField()
    password = serializers.CharField(write_only=True)


class ReviewSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.first_name', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'author_name', 'text', 'rating', 'created_at']
        read_only_fields = ['id', 'author_name', 'created_at']
