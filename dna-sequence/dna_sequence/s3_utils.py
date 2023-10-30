import os
import boto3


def read_s3_file_content(file_name: str):
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=os.getenv("AWS_REGION"),
    )

    response = s3_client.get_object(Bucket=os.getenv("AWS_BUCKET_NAME"), Key=file_name)
    object_data = response["Body"]
    file_content = object_data.read().decode("utf-8")
    dna_sequence = file_content.strip()
    return dna_sequence
