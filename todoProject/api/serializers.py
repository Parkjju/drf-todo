from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = '__all__'
    # fields = ('id', 'title', 'description', 'completed')
    # JSON으로 변경되어야 할 모델과 필드 명시
