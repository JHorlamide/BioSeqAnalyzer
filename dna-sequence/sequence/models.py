from django.db import models
import uuid


class DNASequence(models.Model):
    DNA_NUCLEOTIDE = "D"
    RNA_NUCLEOTIDE = "R"
    LINEAR_TOPOLOGY = "L"
    CIRCULAR_TOPOLOGY = "C"

    NUCLEOTIDE_TYPES = [
        (DNA_NUCLEOTIDE, 'DNA'),
        (RNA_NUCLEOTIDE, 'RNA'),
    ]

    TOPOLOGY_TYPES = [
        (CIRCULAR_TOPOLOGY, "Circular"),
        (LINEAR_TOPOLOGY, "Linear"),
    ]

    base = models.TextField()
    sequence = models.TextField()
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    date_of_submission = models.DateTimeField(auto_now_add=True)
    user_id = models.UUIDField(default=uuid.uuid4, editable=False)
    nucleotide_type = models.CharField(max_length=4, choices=NUCLEOTIDE_TYPES, default=DNA_NUCLEOTIDE)
    topology = models.CharField(max_length=10, choices=TOPOLOGY_TYPES, default=CIRCULAR_TOPOLOGY)

    def __str__(self) -> str:
        return self.name


class AnalysisResult(models.Model):
    sequence = models.ForeignKey(DNASequence, on_delete=models.CASCADE)
    analysis_type = models.CharField(max_length=100)
    result_data = models.JSONField()
    date_of_analysis = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.sequence.name} {self.analysis_type}"

