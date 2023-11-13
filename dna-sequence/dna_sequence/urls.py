from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import DnaSequenceViewSet, AssociateUserToProjectViewSet, ShareProjectView

# Parent Domain Routes Config
router = SimpleRouter()
router.register("dna-sequence", DnaSequenceViewSet, basename="dna-sequence")

urlpatterns = [
    path(
        "project-association/",
        AssociateUserToProjectViewSet.as_view(),
        name="project-association",
    ),
    path(
        "project/share/<uuid:pk>/",
        ShareProjectView.as_view(),
        name="share-project",
    ),
]

urlpatterns += router.urls
