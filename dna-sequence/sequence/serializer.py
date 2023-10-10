from rest_framework import serializers
from .models import DNASequence, AnalysisResult


class DNASequenceSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user_id = self.context["user_id"]
        created_dna = DNASequence.objects.create(user_id=user_id, **validated_data)
        return created_dna
    

    class Meta:
        model = DNASequence
        fields = ["id", "name", "bases", "sequence", "description",
                  "date_of_submission", "nucleotide_type", "topology"]


class AnalysesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalysisResult
        fields = ["id", "analysis_type", "result_data", "date_of_analysis", "sequence"]
