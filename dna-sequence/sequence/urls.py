from django.urls import path, include
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views

router = DefaultRouter()
router.register("dna-sequence", views.DnaSequenceViewSet, basename="dna-sequence")


# urlpatterns = router.urls
urlpatterns = [
  path("", include(router.urls)) 
]
