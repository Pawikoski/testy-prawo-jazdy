from django.contrib import admin
from .models import Question, Category


admin.site.register(Category)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_no', 'language', 'text')
    list_filter = ('language', 'categories')
    search_fields = ('text',)
