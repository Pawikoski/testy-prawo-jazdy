import random

from .models import Question, Category, ContactMessage, QuestionComment, User
from .serializers import (
    QuestionSerializer,
    CategorySerializer,
    DetailedQuestionSerializer,
    ContactMessageSerializer,
    UserSerializer,
    QuestionCommentSerializer,
)
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = "page_size"
    max_page_size = 1000


class SmallResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 20


class QuestionViewSet(ModelViewSet):
    serializer_class = QuestionSerializer
    pagination_class = StandardResultsSetPagination
    ordering_fields = ["language", "categories"]
    lookup_field = "question_no"
    http_method_names = ["get"]

    def get_queryset(self):
        queryset = Question.objects.all()

        language = self.request.query_params.get("language", None)
        if language is not None:
            queryset = queryset.filter(language=language)

        is_random = self.request.query_params.get("random", None)
        if is_random is not None:
            pks = queryset.values_list("pk", flat=True)
            queryset = queryset.filter(pk=random.choice(pks))

        categories_raw = self.request.query_params.get("categories", None)
        if categories_raw is not None and categories_raw != "":
            categories = Category.objects.filter(name__in=categories_raw.split(","))
            queryset = queryset.filter(categories__in=categories)
        return queryset.distinct()

    def get_serializer_class(self):
        if self.lookup_field in self.kwargs:
            return DetailedQuestionSerializer
        return QuestionSerializer


class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    http_method_names = ["get"]


class ContactMessageViewSet(GenericViewSet, CreateModelMixin):
    serializer_class = ContactMessageSerializer
    queryset = ContactMessage.objects.all()
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["get"]

    def list(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)


class QuestionCommentViewSet(ModelViewSet):
    serializer_class = QuestionCommentSerializer
    pagination_class = SmallResultsSetPagination
    queryset = QuestionComment.objects.all()
    http_method_names = ["get", "post"]
    permission_classes = [AllowAny]

    def filter_queryset(self, queryset):
        return queryset.order_by("-created")

    def list(self, request, *args, **kwargs):
        question_pk = request.query_params.get("qid", None)
        if not question_pk:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        self.queryset = self.queryset.filter(question__id=question_pk)
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = User.objects.get(id=request.user.id)
            if not request.user.first_name:
                user.first_name = request.data.get("name")
                user.save()
            request.data["user"] = user.id
        if request.data.get("user", None) and not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        return super().create(request, *args, **kwargs)
