from django_filters.rest_framework import FilterSet
from .models import DNASequence

class DNASequenceFilter(FilterSet):
  class Meta:
    model = DNASequence
    fields = {
      "topology": ["exact"],
      "nucleotide_type": ["exact"]
    }