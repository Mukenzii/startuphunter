#!/usr/bin/env bash
set -e

if [ "$DATABASE" = "postgres" ]; then
  echo "Waiting for postgres..."

  until echo > /dev/tcp/$SQL_HOST/$SQL_PORT 2>/dev/null; do
    sleep 0.2
  done

  echo "PostgreSQL started"
fi

python manage.py migrate
python manage.py collectstatic --noinput

# Create the admin superuser from env vars on first deploy. createsuperuser
# --noinput reads DJANGO_SUPERUSER_USERNAME/EMAIL/PASSWORD. It errors if the
# user already exists, so ignore that on redeploys.
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
  echo "Ensuring admin superuser exists..."
  python manage.py createsuperuser --noinput || true
fi

exec "$@"
