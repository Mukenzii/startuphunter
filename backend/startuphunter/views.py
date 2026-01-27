import urllib.parse
import requests
from django.conf import settings
from django.shortcuts import redirect
from django.contrib.auth import get_user_model, login

def google_login(request):
    base_url = "https://accounts.google.com/o/oauth2/v2/auth"

    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "email profile openid",
        "prompt": "consent",
        "access_type": "offline",
    }

    url = f"{base_url}?{urllib.parse.urlencode(params)}"
    return redirect(url)

User = get_user_model()

def google_callback(request):
    code = request.GET.get("code")

    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }

    token_response = requests.post(token_url, data=data).json()
    access_token = token_response.get("access_token")

    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {access_token}"}
    ).json()

    email = user_info.get("email")
    name = user_info.get("name")

    user, created = User.objects.get_or_create(
        email=email,
        defaults={"username": email.split("@")[0], "first_name": name}
    )

    login(request, user, backend="django.contrib.auth.backends.ModelBackend")

    return redirect("http://localhost:3000")
