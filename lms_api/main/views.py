from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TeacherSerializer
from . import models
from rest_framework.response import Response
from rest_framework import generics

class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
