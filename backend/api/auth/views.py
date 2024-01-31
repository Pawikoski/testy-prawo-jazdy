from .serializers import LoginSerializer, RegisterSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator


csrf_required = method_decorator(csrf_protect)
ensure_csrf = method_decorator(ensure_csrf_cookie)


class SetCsrfToken(APIView):
    permission_classes = [
        AllowAny,
    ]
    authentication_classes = []

    @ensure_csrf
    def get(self, request):
        return Response({"details": "Initialized"})


class LoginView(APIView):
    permission_classes = [
        AllowAny,
    ]

    @csrf_required
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user)
        if serializer.errors:
            return Response(serializer.errors)
        return Response(status=200)


class RegisterView(APIView):
    permission_classes = [
        AllowAny,
    ]

    @csrf_required
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        if serializer.errors:
            return Response(serializer.errors)
        return Response(status=200)


class LogoutView(APIView):
    permission_classes = [
        AllowAny
    ]

    @csrf_required
    def post(self, request):
        logout(request)
        return Response(status=200)
