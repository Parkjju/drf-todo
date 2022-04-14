from rest_framework.decorators import api_view
from rest_framework.response import Response
# from django.shortcuts import render
# from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

# Create your views here.

# 1) 'api/todos/'로 전체 보여주기만 가능 (이외의 기능은 drf 템플릿에서 테스트 가능)
# class TodoView(viewsets.ModelViewSet):
#   serializer_class = TodoSerializer
#   queryset = Todo.objects.all()

'''
API OVERVIEW (간단한 API 명세)
'''
@api_view(['GET'])
def apiOverview(request):
  api_urls = {
    'List' : '/todo-list',
    'Detail View' : '/todo-detail/<str:pk>/',
    'Create' : '/todo-create/',
    'Update' : '/todo-update/<str:pk>/',
    'Delete' : '/todo-delete/<str:pk>/',
  }
  return Response(api_urls)

'''
DB에 저장된 모든 todo를 가져오는 함수(JSON으로 변환)
'''
@api_view(['GET'])
def todoList(request):
  todos = Todo.objects.all()
  serializer = TodoSerializer(todos, many=True)
  return Response(serializer.data)
  
'''
pk를 사용하여 특정 todo의 세부 내용을 가져오는 함수
'''
@api_view(['GET'])
def todoDetail(request, pk):
  todos = Todo.objects.get(id=pk)
  serializer = TodoSerializer(todos) # 'many=True'를 넣으면 'Todo' object is not iterable 에러 발생! 
  return Response(serializer.data)

'''
id를 사용하여 단일 todo를 갱신하는 함수 - POST는 URL로 처리가 안되므로 DRF가 제공하는 템플릿 사용
'''
@api_view(['POST'])
def todoUpdate(request, pk):
  todo = Todo.objects.get(id=pk)
  serializer = TodoSerializer(instance=todo, data=request.data)
  if serializer.is_valid(): # 유효성 검사
    serializer.save()
  return Response(serializer.data)

'''
새로운 todo를 추가하는 함수 - POST는 URL로 처리가 안되므로 DRF가 제공하는 템플릿 사용
'''
@api_view(['POST'])
def todoCreate(request):
  serializer = TodoSerializer(data=request.data)
  if serializer.is_valid(): # 유효성 검사
    serializer.save()
  return Response(serializer.data)

'''
id를 사용하여 todo를 삭제하는 함수 - DELETE는 URL로 처리가 안되므로 DRF가 제공하는 템플릿 사용
'''
@api_view(['DELETE'])
def todoDelete(request, pk):
  todo = Todo.objects.get(id=pk)
  todo.delete() # 삭제
  return Response("Todo deleted successfully.")