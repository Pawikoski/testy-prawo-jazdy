from .models import Question, Category
from .serializers import QuestionSerializer, CategorySerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class QuestionViewSet(ModelViewSet):
    serializer_class = QuestionSerializer
    pagination_class = StandardResultsSetPagination
    ordering_fields = ['language', 'categories']

    # queryset = Question.objects.all()

    def get_queryset(self):
        queryset = Question.objects.all()

        language = self.request.query_params.get('language', None)
        if language is not None:
            queryset = queryset.filter(language=language)

        categories_raw = self.request.query_params.get('categories', None)
        if categories_raw is not None and categories_raw != '':
            categories = Category.objects.filter(name__in=categories_raw.split(','))
            queryset = queryset.filter(categories__in=categories)
        return queryset


class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
