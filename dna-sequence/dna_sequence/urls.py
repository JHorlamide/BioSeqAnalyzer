# REST Framework Imports
from rest_framework.routers import SimpleRouter

# Application Modules Imports
from .views import DnaSequenceViewSet

# Router Config
router = SimpleRouter()
router.register("dna-sequence", DnaSequenceViewSet, basename="dna-sequence")
urlpatterns = router.urls
