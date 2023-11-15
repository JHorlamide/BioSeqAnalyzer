# Rest Framework
from rest_framework import status
from rest_framework import serializers
from rest_framework.response import Response

# Application Modules
from .models import DNASequence, InvitedUsers


class DNASequenceSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(read_only=True)
    sequence = serializers.CharField(read_only=True)

    class Meta:
        model = DNASequence
        fields = [
            "id",
            "user_id",
            "name",
            "bases",
            "description",
            "file",
            "sequence_id",
            "date_of_submission",
            "nucleotide_type",
            "topology",
            "sequence",
        ]

    def save(self, **kwargs):
        author_id = self.context["author_id"]
        project_id = self.context["project_id"]

        try:
            dna_seq_project = DNASequence.objects.get(
                id=project_id, author_id=author_id
            )

            if dna_seq_project.invited_users.filter(user_id=author_id).exists():
                return Response(
                    {
                        "status": "Failure",
                        "message": "You don't have the permission to update this project",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            for key, value in self.validated_data.items():
                setattr(dna_seq_project, key, value)

            dna_seq_project.save()

            return dna_seq_project
        except DNASequence.DoesNotExist:
            created_dna = DNASequence.objects.create(
                author_id=author_id, **self.validated_data
            )
            return created_dna

    def to_representation(self, instance):
        include_file = self.context.get("include_file", False)

        if "file" in self.fields and not include_file:
            self.fields.pop("file")

        return super().to_representation(instance)


class InvitedUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvitedUsers
        fields = ["user_id"]
