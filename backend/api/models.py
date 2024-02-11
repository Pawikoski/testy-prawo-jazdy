from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.db import models


LANGS = (
    ("pl", "Polish"),
    ("en", "English"),
    ("de", "German"),
)


class Category(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Section(models.Model):
    name = models.CharField(max_length=255)


class Question(models.Model):
    question_no = models.IntegerField()
    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name="questions",
        blank=True,
        null=True,
    )
    language = models.CharField(max_length=2, choices=LANGS)
    text = models.CharField(max_length=255)
    answer_a = models.CharField(max_length=255, blank=True, null=True)
    answer_b = models.CharField(max_length=255, blank=True, null=True)
    answer_c = models.CharField(max_length=255, blank=True, null=True)
    correct_answer = models.CharField(max_length=10)
    media = models.CharField(max_length=128, blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name="questions")
    question_source = models.TextField(blank=True, null=True)
    security_explenation = models.TextField(blank=True, null=True)


class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created = models.DateTimeField(auto_now_add=True)


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_staff", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class UserStatictics(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="statistics")
    questions_count = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)
    incorrect_answers = models.IntegerField(default=0)
    last_answered = models.DateTimeField(auto_now=True)


class UserAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_answers")
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="user_answers"
    )
    answer = models.CharField(max_length=10)
    correct = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)


class ArticleCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)


class Article(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    banner = models.ImageField(upload_to="articles/banners", blank=True, null=True)
    category = models.ForeignKey(ArticleCategory, on_delete=models.CASCADE, related_name="articles")
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles")


COMMENT_STATUS = (
    ("pending", "Pending"),
    ("approved", "Approved"),
    ("rejected", "Rejected"),
    ("reported", "Reported"),
    ("deleted", "Deleted"),
)


class Comment(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name="comments"
    )
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="comments"
    )
    # article = models.ForeignKey() ## TODO:
    status = models.CharField(max_length=10, choices=COMMENT_STATUS, default="pending")
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def get_total_likes(self):
        return self.likes.count()

    def get_total_dislikes(self):
        return self.dislikes.count()


class CommentAnswer(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name="answers_to_comment"
    )
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, related_name="answers_to_comment"
    )
    status = models.CharField(max_length=10, choices=COMMENT_STATUS, default="pending")
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def get_total_likes(self):
        return self.likes.count()

    def get_total_dislikes(self):
        return self.dislikes.count()


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, related_name="likes", null=True, blank=True
    )
    answer = models.ForeignKey(
        CommentAnswer, on_delete=models.CASCADE, related_name="likes", null=True, blank=True
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Dislike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dislikes")
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, related_name="dislikes", null=True, blank=True
    )
    answer = models.ForeignKey(
        CommentAnswer, on_delete=models.CASCADE, related_name="dislikes", null=True, blank=True
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
