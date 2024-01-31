from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.db import models


LANGS = (
    ('pl', 'Polish'),
    ('en', 'English'),
    ('de', 'German'),
)


class Category(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Question(models.Model):
    question_no = models.IntegerField()
    language = models.CharField(max_length=2, choices=LANGS)
    text = models.CharField(max_length=255)
    answer_a = models.CharField(max_length=255, blank=True, null=True)
    answer_b = models.CharField(max_length=255, blank=True, null=True)
    answer_c = models.CharField(max_length=255, blank=True, null=True)
    correct_answer = models.CharField(max_length=10)
    media = models.CharField(max_length=128, blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name='questions')
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
