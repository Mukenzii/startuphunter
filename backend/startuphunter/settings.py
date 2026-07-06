from dotenv import load_dotenv
import os
load_dotenv('.env.dev')

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("SECRET_KEY")
DEBUG = os.environ.get("DEBUG", "0").strip().lower() in ("1", "true", "yes", "on")
ALLOWED_HOSTS = os.environ.get(
    "DJANGO_ALLOWED_HOSTS", "localhost 127.0.0.1 [::1]"
).split()

# Render injects the service's public hostname at runtime; trust it automatically
# so ALLOWED_HOSTS / CSRF work without hardcoding the generated domain.
_RENDER_HOST = os.environ.get("RENDER_EXTERNAL_HOSTNAME")
if _RENDER_HOST:
    ALLOWED_HOSTS.append(_RENDER_HOST)

# Origins allowed to send unsafe (POST/PUT/DELETE) requests — required for the
# admin login and any form POST when the app is reached through nginx (:1337)
# or the Vite dev server (:3000). Add your production URL via the env var.
CSRF_TRUSTED_ORIGINS = os.environ.get(
    "DJANGO_CSRF_TRUSTED_ORIGINS",
    "http://localhost:1337 http://127.0.0.1:1337 "
    "http://localhost:3000 http://127.0.0.1:3000 "
    "http://localhost:8000 http://127.0.0.1:8000",
).split()
if _RENDER_HOST:
    CSRF_TRUSTED_ORIGINS.append(f"https://{_RENDER_HOST}")

# Trust the X-Forwarded-Proto header nginx sets, so CSRF/secure checks work
# correctly when the app is served behind the proxy (and later over HTTPS).
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Google OAuth web client ID (from Google Cloud Console). Used to verify the
# ID token sent by "Sign in with Google" on the frontend.
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'startuphunterapp',
    'corsheaders',
    'rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]


STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:1337",
]
# Allow the deployed frontend (e.g. the Vercel URL) via a space-separated env var.
CORS_ALLOWED_ORIGINS += os.environ.get("DJANGO_CORS_ALLOWED_ORIGINS", "").split()

ROOT_URLCONF = 'startuphunter.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'startuphunter.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('POSTGRES_HOST', 'db'),
        'PORT': os.getenv('POSTGRES_PORT', 5432),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"



DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'