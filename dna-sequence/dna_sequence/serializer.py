from rest_framework import serializers

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

    # def save(self, **kwargs):
    #     dna_sequence_id = self.context["dna_sequence_id"]
    #     new_invited_user = InvitedUsers.objects.create()
