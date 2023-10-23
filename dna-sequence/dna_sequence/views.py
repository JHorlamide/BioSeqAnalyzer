# Core Modules
import json, os, uuid
from datetime import datetime

from boto3.session import Session

# Django
from django_filters.rest_framework import DjangoFilterBackend

# REST Framework
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework import generics, status


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
        auth_user = json.loads(self.request.META.get("HTTP_X_DECODED_USER"))
        return DNASequence.objects.filter(user_id=auth_user["userId"])


    def get_serializer_context(self):
        auth_user = json.loads(self.request.META.get("HTTP_X_DECODED_USER"))
        return { "user_id": auth_user["userId"] }
    
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    
    def create(self, request, *args, **kwargs):
        auth_user = json.loads(self.request.META.get("HTTP_X_DECODED_USER"))
        serializer = DNASequenceSerializer(
            data=request.data, context={ "user_id": auth_user["userId"] }
        )
        serializer.is_valid(raise_exception=True)
        
        file = request.FILES.get("file")
        if file is not None:
            filename = f"dna-seq/{file.name + str(uuid.uuid4())}"
            session = Session(
                region_name=os.getenv('AWS_REGION'),
                aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
            )
        
            s3 = session.resource('s3')
            s3.Bucket("bioseq-bucket").put_object(Key=filename, Body=file)
        
        serializer.save()
        return Response(
            {
                "status": "success",
                "message": "File Upload Successful, and new record created",
                "data": serializer.data
            }, 
            status=status.HTTP_201_CREATED
        )
        
