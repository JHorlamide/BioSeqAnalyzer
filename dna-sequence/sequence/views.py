# Core Modules
import json

# Django
from django_filters.rest_framework import DjangoFilterBackend

# REST Framework
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter

# Application Modules
from .models import DNASequence, AnalysisResult
from .serializer import DNASequenceSerializer, AnalysesSerializer
from .filter import DNASequenceFilter
from .pagination import DefaultPagination


class DnaSequenceViewSet(ModelViewSet):
    queryset = DNASequence.objects.all()
    serializer_class = DNASequenceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = DNASequenceFilter
    pagination_class = DefaultPagination
    search_fields = ["name", "description"]
    order_fields = ["date_of_submission"]

    def get_serializer_context(self):
        decoded_user_json = self.request.META.get("HTTP_X_DECODED_USER")
        auth_user = json.loads(decoded_user_json)
        return { "user_id": auth_user["userId"] }
    
            
    
class AnalysesViewSet(ModelViewSet):
    queryset = AnalysisResult.objects.all()
    serializer_class = AnalysesSerializer