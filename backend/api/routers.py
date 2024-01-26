from .viewsets import QuestionViewSet, CategoryViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('questions', QuestionViewSet, basename='questions')
router.register('categories', CategoryViewSet, basename='categories')
