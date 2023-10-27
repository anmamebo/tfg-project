# from django.urls import include, path
# from authentication import views
# from rest_framework.routers import DefaultRouter

from django.urls import re_path
from . import views

urlpatterns = [
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('test_token', views.test_token),
]

# router = DefaultRouter()
# router.register(r'users', views.UserListView)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

# urlpatterns = [
#     path('users/', views.UserListView.as_view, name='user-list'),
#     path('users/<int:user_id>/', views.UserDetailView.as_view, name='user-detail'),
# ]