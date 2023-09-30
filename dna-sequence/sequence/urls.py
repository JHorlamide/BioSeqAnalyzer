# REST Framework Imports
from rest_framework_nested import routers

# Application Modules Imports
from .views import DnaSequenceViewSet, AnalysesViewSet

# Router Config
router = routers.DefaultRouter()

# Domain Routes Config
router.register("dna-sequence", DnaSequenceViewSet, basename="dna-sequence")


# Child/Nested Routes Config
dna_sequence_router = routers.NestedDefaultRouter(router, "dna-sequence", lookup="dna_sequence")
dna_sequence_router.register('analyses', AnalysesViewSet, basename="dna-sequence-analyses")

urlpatterns = router.urls + dna_sequence_router.urls
