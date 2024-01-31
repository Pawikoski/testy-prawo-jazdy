import random

from .models import Question, Category, ContactMessage, User
from .serializers import (
    QuestionSerializer,
    CategorySerializer,
    DetailedQuestionSerializer,
    ContactMessageSerializer,
    UserSerializer,
)
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import MethodNotAllowed


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = "page_size"
    max_page_size = 1000


class QuestionViewSet(ModelViewSet):
    serializer_class = QuestionSerializer
    pagination_class = StandardResultsSetPagination
    ordering_fields = ["language", "categories"]
    lookup_field = "question_no"

    # queryset = Question.objects.all()

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
        return queryset

    def get_serializer_class(self):
        if self.lookup_field in self.kwargs:
            return DetailedQuestionSerializer
        return QuestionSerializer


class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


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
    http_method_names = ["get", ]

    def list(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)
