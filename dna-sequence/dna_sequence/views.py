# Core Modules
import json

# Django
from django_filters.rest_framework import DjangoFilterBackend

# REST Framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter

# Application Modules
from .models import DNASequence
from .serializer import DNASequenceSerializer
from .filter import DNASequenceFilter
from .pagination import DefaultPagination

class DnaSequenceViewSet(ModelViewSet):
    serializer_class = DNASequenceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = DNASequenceFilter
    pagination_class = DefaultPagination
    search_fields = ["name"]
    order_fields = ["date_of_submission"]


    def get_queryset(self):
        auth_user = json.loads(self.request.META.get("HTTP_X_DECODED_USER"))
        return DNASequence.objects.filter(user_id=auth_user["userId"])


    def get_serializer_context(self):
        auth_user = json.loads(self.request.META.get("HTTP_X_DECODED_USER"))
        return { "user_id": auth_user["userId"] }
    