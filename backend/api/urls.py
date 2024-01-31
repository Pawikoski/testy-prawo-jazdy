from django.urls import path
from .auth.views import LoginView, RegisterView, SetCsrfToken, LogoutView
from .routers import router


urlpatterns = [
    path('auth/initialize/', SetCsrfToken.as_view(), name='initialize'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
] + router.urls
