from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import DnaSequenceViewSet, AssociateUserToProjectViewSet

# Parent Domain Routes Config
router = SimpleRouter()
router.register("dna-sequence", DnaSequenceViewSet, basename="dna-sequence")

urlpatterns = [
    path(
        "dna-user-project-associations/",
        AssociateUserToProjectViewSet.as_view(),
        name="project-invitation",
    ),
]

urlpatterns += router.urls
