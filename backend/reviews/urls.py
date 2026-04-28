from django.urls import path
from .views import RegisterView, LoginView, ReviewListCreateView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('reviews/', ReviewListCreateView.as_view(), name='reviews'),
]
