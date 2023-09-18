from django_filter.rest_framework import FilterSet
from .models import DNASequence

class DNASequenceFilter(FilterSet):
  class Meta:
    model = DNASequence
    fields = {
      "name": ["exact"],
      "base": ["exact"]
    }