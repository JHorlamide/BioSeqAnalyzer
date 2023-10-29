# Core Modules
import json

# Django
from django_filters.rest_framework import DjangoFilterBackend

# REST Framework
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter

# Application Modules
from .models import DNASequence
from .serializer import DNASequenceSerializer
from .filter import DNASequenceFilter
from .pagination import DefaultPagination
from .s3_utils import read_s3_file_content
from .entrez_utils import get_sequence_record


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
        return { "user_id": auth_user["userId"], "include_file": False }
    
    
    def create(self, request, *args, **kwargs):
        auth_user = json.loads(self.request.META.get("HTTP_X_DECODED_USER"))
        sequence_id = request.data.get("sequence_id")
        serializer = DNASequenceSerializer(
            data=request.data,
            context={ "user_id": auth_user["userId"], "include_file": True }
        )
        serializer.is_valid(raise_exception=True)
        dna_sequence = serializer.save()
        
        if sequence_id:
            dna_sequence.sequence = get_sequence_record(sequence_id)
            dna_sequence.save()

        return Response(
            {
                "status": "Success",
                "message": "Project created successfully",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )
    
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        
        if instance.file.name:
            file_name = f"dna-seq/{instance.file.name}"
            response = serializer.data
            response["file_content"] = read_s3_file_content(file_name)
        
            return Response(
                {
                    "status": "Success",
                    "message": "Project fetched successfully",
                    "data": response
                },
                status=status.HTTP_200_OK
            )
        
        return Response(
            {
                "status": "Success",
                "message": "Project fetched successfully",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )