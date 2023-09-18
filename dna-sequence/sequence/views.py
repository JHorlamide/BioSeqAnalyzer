import json

from rest_framework.viewsets import ModelViewSet
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, CreateModelMixin

from .models import DNASequence
from .serializer import DNASequenceSerializer


class DnaSequenceViewSet(ModelViewSet):
    queryset = DNASequence.objects.all()
    serializer_class = DNASequenceSerializer

    def get_serializer_context(self):
        decoded_user_json = self.request.META.get("HTTP_X_DECODED_USER")
        auth_user = json.loads(decoded_user_json)
        user_id = auth_user["userId"]
        return {"user_id": user_id}
    
