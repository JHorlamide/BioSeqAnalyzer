from django.urls import path
from rest_framework.routers import SimpleRouter

# Application Modules
from .views import (
    DnaSequenceViewSet,
    AddUserToProjectView,
    ShareProjectView,
    DeleteProjectsView,
)

router = SimpleRouter()
router.register("dna-sequence", DnaSequenceViewSet, basename="dna-sequence")

urlpatterns = [
    path(
        "add-user-to-project/",
        AddUserToProjectView.as_view(),
        name="project-association",
    ),
    path(
        "project/share/<uuid:pk>/",
        ShareProjectView.as_view(),
        name="share-project",
    ),
    path(
        "delete-projects/",
        DeleteProjectsView.as_view(),
        name="delete-projects",
    ),
]

urlpatterns += router.urls
