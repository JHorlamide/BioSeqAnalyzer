import uuid
import re
from django.db import models
from django.core.exceptions import ValidationError

def validate_string(value):
    if not isinstance(value, str):
        raise ValidationError('Please enter a valid input', code=400)
    
def validate_no_emoji(value):
    if not isinstance(value, str):
        raise ValidationError('Please enter a valid input', code=400)

    # Regular expression to match most common emojis and symbols
    emoji_pattern = re.compile(
        "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F700-\U0001F77F"  # alchemical symbols
        u"\U0001F780-\U0001F7FF"  # Geometric Shapes Extended
        u"\U0001F800-\U0001F8FF"  # Supplemental Arrows-C
        u"\U0001F900-\U0001F9FF"  # Supplemental Symbols and Pictographs
        u"\U0001FA00-\U0001FA6F"  # Chess Symbols
        u"\U0001FA70-\U0001FAFF"  # Symbols and Pictographs Extended-A
        u"\U00002702-\U000027B0"  # Dingbats
        "]+",
        flags=re.UNICODE,
    )

    if emoji_pattern.search(value):
        raise ValidationError('Emojis and special symbols are not allowed.', code=400)
  
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
    bases = models.TextField(validators=[validate_string, validate_no_emoji])
    file = models.FileField(blank=True, null=True)
    name = models.CharField(
        max_length=100,
        validators=[validate_string, validate_no_emoji]
    )
    description = models.TextField(
        null=True,
        blank=True,
        error_messages={"required": "Enter a valid description"},
        validators=[validate_string, validate_no_emoji]
    )
    date_of_submission = models.DateTimeField(auto_now_add=True)
    user_id = models.UUIDField(default=uuid.uuid4, editable=False)
    nucleotide_type = models.CharField(max_length=4, choices=NUCLEOTIDE_TYPES, default=DNA_NUCLEOTIDE)
    topology = models.CharField(max_length=10, choices=TOPOLOGY_TYPES, default=CIRCULAR_TOPOLOGY)

    def __str__(self) -> str:
        return self.name

class UploadFileForm(models.Model):
    file = models.FileField()