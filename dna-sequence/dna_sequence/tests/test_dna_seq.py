from rest_framework import status
from rest_framework.test import APIClient
import pytest

@pytest.mark.django_db
class TestCreateDnaSequence:
    def test_if_user_is_anonymous(self):
        # Arrange

        # Act
        client = APIClient()
        response = client.post("/api/dna-sequence", {"name": "a", "bases": "aaabbbcc"})

        # Assert
        assert response.status_code == status.HTTP_400_BAD_REQUEST
