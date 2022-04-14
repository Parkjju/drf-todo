from django.urls import path
from . import views

urlpatterns = [
  path('', views.apiOverview, name="api-overview"),
  path('todo-list/', views.todoList, name="todo-list"), # 함수와 URL엔드포인트 바인딩
  path('todo-detail/<str:pk>/', views.todoDetail, name="todo-detail"),
  path('todo-update/<str:pk>/', views.todoUpdate, name="todo-update"),
  path('todo-create/', views.todoCreate, name="todo-create"),
  path('todo-delete/<str:pk>/', views.todoDelete, name="todo-delete"),
]