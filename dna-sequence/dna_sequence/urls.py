from rest_framework.routers import SimpleRouter
from django.urls import path
from .views import DnaSequenceViewSet, SequenceDataImportView

# Parent Domain Routes Config
router = SimpleRouter()
router.register("dna-sequence", DnaSequenceViewSet, basename="dna-sequence")


# Product Child Router
sequence_data_import_url = [
  path("sequence-data-import/",
       SequenceDataImportView.as_view(), 
       name="sequence-data-import")
]

urlpatterns = router.urls + sequence_data_import_url
