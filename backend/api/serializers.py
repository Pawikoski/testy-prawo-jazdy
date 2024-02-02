from rest_framework import serializers
from .models import (
    Question,
    Category,
    ContactMessage,
    User,
    QuestionComment,
    QuestionCommentAnswer,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)

    class Meta:
        model = Question
        fields = [
            "id",
            "question_no",
            "categories",
            "text",
            "answer_a",
            "answer_b",
            "answer_c",
            "correct_answer",
        ]


class DetailedQuestionSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)

    class Meta:
        model = Question
        fields = "__all__"


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "last_login", "date_joined")


class QuestionCommentAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionCommentAnswer
        fields = ["id", "user", "status", "text", "created"]


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name"]


class QuestionCommentSerializer(serializers.ModelSerializer):
    author = UserNameSerializer(read_only=True, source="user", required=False)
    answers_to_comment = QuestionCommentAnswerSerializer(many=True, read_only=True)
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()
    disliked = serializers.SerializerMethodField()

    def get_likes(self, obj):
        return obj.likes.count()

    def get_dislikes(self, obj):
        return obj.dislikes.count()

    def get_liked(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.likes.filter(user=user).exists()
        return False

    def get_disliked(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.dislikes.filter(user=user).exists()
        return False

    class Meta:
        model = QuestionComment
        fields = [
            "id",
            "author",
            "user",
            "question",
            "status",
            "text",
            "created",
            "answers_to_comment",
            "likes",
            "dislikes",
            "liked",
            "disliked",
        ]
        extra_kwargs = {"user": {"write_only": True}}
