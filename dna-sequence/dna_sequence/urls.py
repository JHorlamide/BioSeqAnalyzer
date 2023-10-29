from rest_framework.routers import SimpleRouter
from .views import DnaSequenceViewSet

# Parent Domain Routes Config
router = SimpleRouter()
router.register("dna-sequence", DnaSequenceViewSet, basename="dna-sequence")

urlpatterns = router.urls
