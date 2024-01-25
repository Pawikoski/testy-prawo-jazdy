from django.db import models


LANGS = (
    ('pl', 'Polish'),
    ('en', 'English'),
    ('de', 'German'),
)


class Category(models.Model):
    name = models.CharField(max_length=10)


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
