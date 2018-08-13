from rest_framework import generics

from StatisticalPlatform import models
from StatisticalPlatform import serializers

class UserListView(generics.ListCreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
