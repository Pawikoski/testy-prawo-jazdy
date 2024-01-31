from .viewsets import QuestionViewSet, CategoryViewSet, ContactMessageViewSet, UserViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('questions', QuestionViewSet, basename='questions')
router.register('categories', CategoryViewSet, basename='categories')
router.register('contact', ContactMessageViewSet, basename='contact')
router.register('user', UserViewSet, basename='user')
