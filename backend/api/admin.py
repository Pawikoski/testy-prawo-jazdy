from django.contrib import admin
from .models import Question, Category, ContactMessage, User


admin.site.register(Category)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_no', 'language', 'text')
    list_filter = ('language', 'categories')
    search_fields = ('text',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('subject', 'name', 'email', 'created')
    search_fields = ('name', 'email', 'subject', 'message')


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_staff', 'is_superuser')
    search_fields = ('email',)
