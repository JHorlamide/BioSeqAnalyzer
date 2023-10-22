# Core Modules
import json

# Django
from django_filters.rest_framework import DjangoFilterBackend
from django.core.files.storage import default_storage

# REST Framework
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response

# from django.core.files.storage import default_storage

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
    http_method_names = ["get", "post", "patch", "delete"]


    def get_queryset(self):
        decoded_user_json = self.request.META.get("HTTP_X_DECODED_USER")
        auth_user = json.loads(decoded_user_json)
        return DNASequence.objects.filter(user_id=auth_user["userId"])


    def get_serializer_context(self):
        decoded_user_json = self.request.META.get("HTTP_X_DECODED_USER")
        auth_user = json.loads(decoded_user_json)
        return { "user_id": auth_user["userId"] }
    
    


# def create(self, request, *args, **kwargs):
#     auth_user = json.loads(self.request.META.get("HTTP_X_DECODED_USER"))
        
#     serializer = DNASequenceSerializer(
#         data=request.data,
#         context={ "user_id": auth_user["userId"] }
#     )
        
#     if request.FILES["file"]:
#         default_storage.save(request.FILES["file"].name, request.FILES["file"])
            
#     serializer.is_valid(raise_exception=True)
#     dna_sequence = serializer.save()
#     serializer = DNASequenceSerializer(dna_sequence)
#     return Response(serializer.data)
