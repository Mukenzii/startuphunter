from datetime import timedelta

from .models import Categories, UserProblems, ActiveVisitor, ONLINE_WINDOW_SECONDS
from .serializers import CategorySerializer, UserProblemSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone


def _online_count():
    """Number of visitors whose last heartbeat is within the online window."""
    cutoff = timezone.now() - timedelta(seconds=ONLINE_WINDOW_SECONDS)
    return ActiveVisitor.objects.filter(last_seen__gte=cutoff).count()


@api_view(["POST"])
def presence_heartbeat(request):
    """Record/refresh a visitor's presence and return the live online count.

    The frontend posts {client_id} on load and every ~30s. client_id is an
    anonymous random id kept in the browser's localStorage.
    """
    client_id = str(request.data.get("client_id") or "").strip()[:64]
    if not client_id:
        return Response({"detail": "Missing client_id."}, status=status.HTTP_400_BAD_REQUEST)

    # auto_now on last_seen bumps the timestamp on every save (create or update).
    ActiveVisitor.objects.update_or_create(client_id=client_id)

    # Opportunistic cleanup so the table doesn't grow without bound.
    ActiveVisitor.objects.filter(
        last_seen__lt=timezone.now() - timedelta(hours=1)
    ).delete()

    return Response({"online": _online_count()})


@api_view(["GET"])
def presence_online(request):
    """Return just the current online count (no heartbeat recorded)."""
    return Response({"online": _online_count()})


@api_view(["POST"])
def google_auth(request):
    """Verify a Google ID token ('credential') and sign the user up / in.

    The frontend's "Sign up with Google" button posts the credential here; we
    verify it against our GOOGLE_CLIENT_ID, then create or fetch a Django user
    keyed by the Google email. Returns the verified {email, name}.
    """
    credential = request.data.get("credential")
    if not credential:
        return Response({"detail": "Missing credential."}, status=status.HTTP_400_BAD_REQUEST)

    client_id = getattr(settings, "GOOGLE_CLIENT_ID", "")
    if not client_id:
        return Response(
            {"detail": "Google sign-in is not configured (GOOGLE_CLIENT_ID is empty)."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    try:
        from google.oauth2 import id_token as google_id_token
        from google.auth.transport import requests as google_requests

        info = google_id_token.verify_oauth2_token(
            credential, google_requests.Request(), client_id
        )
    except Exception:
        return Response({"detail": "Invalid Google token."}, status=status.HTTP_400_BAD_REQUEST)

    email = info.get("email", "")
    if not email:
        return Response({"detail": "Google account has no email."}, status=status.HTTP_400_BAD_REQUEST)
    name = info.get("name") or email.split("@")[0]

    User = get_user_model()
    User.objects.get_or_create(
        username=email,
        defaults={"email": email, "first_name": name[:30]},
    )
    return Response({"email": email, "name": name})


class CategoryList(generics.ListAPIView):

    queryset = Categories.objects.filter()

    serializer_class = CategorySerializer



@api_view(["GET"])

def get_categories(request):

    categories = Categories.objects.all()

    serializers = CategorySerializer(categories, many=True)

    category_name = ['All'] + [cat['name'] for cat in serializers.data]

    return Response(category_name)


class UserProblemCreate(generics.CreateAPIView):
    queryset = UserProblems.objects.all()
    serializer_class = UserProblemSerializer


@api_view(["GET"])
def get_problems_by_category(request, category_name):
    if category_name == "All":
        problems = UserProblems.objects.filter(published=True)

    else:
        problems = UserProblems.objects.filter(category__title=category_name, published=True)

    serializer = UserProblemSerializer(problems, many=True)
    return Response(serializer.data)


@api_view(["GET"]) 
def get_problem_by_id(request, pk):
    problem = get_object_or_404(UserProblems, pk=pk)
    serializer = UserProblemSerializer(problem)
    return Response(serializer.data, status=status.HTTP_200_OK)


