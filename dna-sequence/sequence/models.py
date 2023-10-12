import uuid
from django.db import models
from django.core.exceptions import ValidationError

def validate_string(value):
    if not isinstance(value, str):
        raise ValidationError('Please enter a valid input', code=400)
    
class DNASequence(models.Model):
    DNA_NUCLEOTIDE = "D"
    RNA_NUCLEOTIDE = "R"
    
    LINEAR_TOPOLOGY = "L"
    CIRCULAR_TOPOLOGY = "C"
    BOTH_TOPOLOGY = "B"
    BOTH_FLIP_TOPOLOGY = "B_F"

    NUCLEOTIDE_TYPES = [
        (DNA_NUCLEOTIDE, 'DNA'),
        (RNA_NUCLEOTIDE, 'RNA'),
    ]

    TOPOLOGY_TYPES = [
        (CIRCULAR_TOPOLOGY, "Circular"),
        (LINEAR_TOPOLOGY, "Linear"),
        (BOTH_TOPOLOGY, "Both"),
        (BOTH_FLIP_TOPOLOGY, "Both Flip"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,)
    bases = models.TextField()
    sequence = models.TextField()
    name = models.CharField(max_length=100)
    description = models.TextField(
        null=True,
        blank=True,
        error_messages={"required": "Enter a valid description"},
        validators=[validate_string]
    )
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

