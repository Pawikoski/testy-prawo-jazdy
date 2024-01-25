from .viewsets import QuestionViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('questions', QuestionViewSet, basename='questions')
