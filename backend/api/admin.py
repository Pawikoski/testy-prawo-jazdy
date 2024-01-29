from django.contrib import admin
from .models import Question, Category, ContactMessage


admin.site.register(Category)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_no', 'language', 'text')
    list_filter = ('language', 'categories')
    search_fields = ('text',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created')
    search_fields = ('name', 'email', 'subject', 'message')
