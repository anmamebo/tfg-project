#!/bin/sh

# Realizar migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Iniciar el servidor de desarrollo
python manage.py runserver 0.0.0.0:8000
