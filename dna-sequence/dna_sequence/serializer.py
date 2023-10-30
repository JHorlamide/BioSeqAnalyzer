from rest_framework import serializers

from .models import DNASequence


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
        user_id = self.context["user_id"]
        created_dna = DNASequence.objects.create(user_id=user_id, **self.validated_data)
        return created_dna

    def to_representation(self, instance):
        include_file = self.context.get("include_file", False)

        if "file" in self.fields and not include_file:
            self.fields.pop("file")

        return super().to_representation(instance)
