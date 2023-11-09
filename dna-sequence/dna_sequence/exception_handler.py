from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        response.data = {
            "status": "Failure",
            "message": response.data.get("detail", "An error occurred"),
        }

        response.status_code = 400

    return response
