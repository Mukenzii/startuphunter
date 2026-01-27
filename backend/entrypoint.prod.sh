#!/usr/bin/env bash
set -e

if [ "$DATABASE" = "postgres" ]; then
  echo "Waiting for postgres..."

  until echo > /dev/tcp/$SQL_HOST/$SQL_PORT 2>/dev/null; do
    sleep 0.2
  done

  echo "PostgreSQL started"
fi

python manage.py flush --no-input
python manage.py migrate

exec "$@"
