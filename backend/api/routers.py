from .viewsets import (
    QuestionViewSet,
    CategoryViewSet,
    ContactMessageViewSet,
    UserViewSet,
    CommentViewSet,
    CommentAnswerViewSet,
    LikeViewset,
    DislikeViewset,
    QuestionCountView
)
from rest_framework import routers

router = routers.DefaultRouter()


router.register(
    "comments", CommentViewSet, basename="comments"
)
router.register(
    "comment-answers",
    CommentAnswerViewSet,
    basename="comment-answers",
)
router.register('question-count', QuestionCountView, basename='question-count')

router.register('like', LikeViewset, basename='like')
router.register('dislike', DislikeViewset, basename='dislike')

router.register("questions", QuestionViewSet, basename="questions")
router.register("categories", CategoryViewSet, basename="categories")
router.register("contact", ContactMessageViewSet, basename="contact")
router.register("user", UserViewSet, basename="user")
