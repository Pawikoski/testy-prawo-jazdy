from rest_framework import serializers
from .models import (
    Question,
    Category,
    ContactMessage,
    User,
    Like,
    Dislike,
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


class SideQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id", "question_no", "text"]


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


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name"]


class QuestionCommentAnswerSerializer(serializers.ModelSerializer):
    author = UserNameSerializer(read_only=True, source="user", required=False)
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
        model = QuestionCommentAnswer
        fields = [
            "id",
            "author",
            "user",
            "comment",
            "status",
            "text",
            "created",
            "likes",
            "dislikes",
            "liked",
            "disliked",
        ]
        extra_kwargs = {"user": {"write_only": True}}


class QuestionCommentSerializer(serializers.ModelSerializer):
    author = UserNameSerializer(read_only=True, source="user", required=False)
    answers = QuestionCommentAnswerSerializer(
        many=True, read_only=True, source="answers_to_comment"
    )
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
            "answers",
            "likes",
            "dislikes",
            "liked",
            "disliked",
        ]
        extra_kwargs = {"user": {"write_only": True}}


class RatingSerializer(serializers.ModelSerializer):
    comment_id = serializers.IntegerField(required=False)
    answer_id = serializers.IntegerField(required=False)

    def validate(self, data):
        if not data.get("comment_id") and not data.get("answer_id"):
            raise serializers.ValidationError(
                "You must provide a comment_id or answer_id"
            )
        if data.get("comment_id") and data.get("answer_id"):
            raise serializers.ValidationError(
                "You cannot provide both comment_id and answer_id"
            )
        kwargs = {"user": data["user"]}

        if data.get("comment_id"):
            kwargs["comment_id"] = data["comment_id"]
        else:
            kwargs["answer_id"] = data["answer_id"]
        if Like.objects.filter(**kwargs).exists():
            raise serializers.ValidationError("You have already rate this comment")
        return data


class LikeSerializer(RatingSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class DislikeSerializer(RatingSerializer):
    class Meta:
        model = Dislike
        fields = "__all__"
