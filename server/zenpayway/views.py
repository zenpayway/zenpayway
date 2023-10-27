from .models import User

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class UserStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_status = request.data.get("status")

        if user_status not in [status[0] for status in User.STATUS]:
            return Response({ "message": "Invalid status value." }, status=status.HTTP_BAD_REQUEST)

        try:
            user = User.objects.get(username=request.user.username)
            user.status = user_status
            user.save()
            return Response({ "message": "Status updated successfully." }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({ "message": "User not found." }, status=status.HTTP_NOT_FOUND)
        except Exception as e:
            return Response({ "message": str(e) }, status=status.HTTP_INTERNAL_SERVER_ERROR)
