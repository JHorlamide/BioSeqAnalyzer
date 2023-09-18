from rest_framework import serializers
from .models import DNASequence


class DNASequenceSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user_id = self.context["user_id"]
        created_dna = DNASequence.objects.create(user_id=user_id, **validated_data)
        return created_dna

    class Meta:
        model = DNASequence
        fields = ["id", "name", "base", "sequence", "schema",
                  "description", "date_of_submission", "nucleotide_type", "topology"]

