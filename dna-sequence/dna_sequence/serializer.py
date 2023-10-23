from rest_framework import serializers

from .models import DNASequence


class DNASequenceSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(read_only=True)
    # def create(self, validated_data):
        # user_id = self.context["user_id"]
        # created_dna = DNASequence.objects.create(user_id=user_id, **validated_data)
        # return created_dna
    
    def save(self, **kwargs):
        user_id = self.context["user_id"]
        created_dna = DNASequence.objects.create(user_id=user_id, **self.validated_data)
        return created_dna
    
    class Meta:
        model = DNASequence
        fields = ["id", "user_id", "name", "bases", "description", "file",
                  "date_of_submission", "nucleotide_type", "topology"]