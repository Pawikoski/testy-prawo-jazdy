from rest_framework import serializers
from .models import Question, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', ]


class QuestionSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)

    class Meta:
        model = Question
        fields = ['id', 'categories', 'text']
