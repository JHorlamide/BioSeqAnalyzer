# Core Modules
import json

# Django
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

# REST Framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter

# Application Modules
from .models import DNASequence, InvitedUsers
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
        user_id = auth_user["userId"]
        query_condition = Q(author_id=user_id) | Q(invited_users__user_id=user_id)
        return DNASequence.objects.filter(query_condition).distinct()

    def get_serializer_context(self):
        auth_user = json.loads(self.request.META.get("HTTP_X_DECODED_USER"))
        return {"author_id": auth_user["userId"], "include_file": False}

    def create(self, request, *args, **kwargs):
        auth_user = json.loads(self.request.META.get("HTTP_X_DECODED_USER"))
        sequence_id = request.data.get("sequence_id")
        serializer = DNASequenceSerializer(
            data=request.data,
            context={"author_id": auth_user["userId"], "include_file": True},
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
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
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
                    "data": response,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "status": "Success",
                "message": "Project fetched successfully",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    def destroy(self, request, *args, **kwargs):
        auth_user = json.loads(self.request.META.get("HTTP_X_DECODED_USER"))
        user_id = auth_user["userId"]
        instance = self.get_object()

        if instance.invited_users.filter(user_id=user_id).exists():
            return Response(
                {
                    "status": "Failure",
                    "message": "You don't have the permission to delete this project",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().destroy(request, *args, **kwargs)


class AssociateUserToProjectViewSet(APIView):
    def post(self, request, format=None):
        project_id = request.data.get("project_id")
        user_id = request.data.get("user_id")

        try:
            dna_sequence = DNASequence.objects.get(id=project_id)
            invited_user, created = InvitedUsers.objects.get_or_create(user_id=user_id)

            if created:
                dna_sequence.invited_users.add(invited_user)

            dna_sequence_serializer = DNASequenceSerializer(dna_sequence)

            return Response(
                {
                    "status": "Success",
                    "message": "User invited project",
                    "data": dna_sequence_serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        except DNASequence.DoesNotExist:
            return Response(
                {"status": "Failure", "message": "DNA sequence project not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ShareProjectView(RetrieveAPIView):
    serializer_class = DNASequenceSerializer

    def get_serializer_class(self):
        return super().get_serializer_class()

    def get(self, request, *args, **kwargs):
        project_id = self.kwargs.get("pk")

        try:
            instance = DNASequence.objects.get(id=project_id)
            serializer = self.get_serializer(instance)

            if instance.file.name:
                file_name = f"dna-seq/{instance.file.name}"
                response = serializer.data
                response["file_content"] = read_s3_file_content(file_name)

                return Response(
                    {
                        "status": "Success",
                        "message": "Project fetched successfully",
                        "data": response,
                    },
                    status=status.HTTP_200_OK,
                )

            return Response(
                {
                    "status": "Success",
                    "message": "Project fetched successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
