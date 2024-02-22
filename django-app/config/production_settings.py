"""
Django settings for django-app project.

Generated by 'django-admin startproject' using Django 4.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
from datetime import timedelta
from pathlib import Path

# Directorio base del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent

# Clave secreta para Django (debería estar en una variable de entorno en producción)
SECRET_KEY = os.environ["SECRET_KEY"]

# Entorno de desarrollo - DEBUG activado
# DEBUG = False
DEBUG = True

# Lista de hosts permitidos en producción (debería especificarse en producción)
ALLOWED_HOSTS = ["*"]

CSRF_TRUSTED_ORIGINS = ["https://*.up.railway.app", "https://*.vercel.app"]

# Aplicaciones instaladas en el proyecto

# Apps base de Django
BASE_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

# Apps locales del proyecto
LOCAL_APPS = [
    "apps.base",
    "apps.users",
    "apps.groups",
    "apps.patients",
    "apps.addresses",
    "apps.doctors",
    "apps.medicalspecialties",
    "apps.schedules",
    "apps.rooms",
    "apps.departments",
    "apps.appointments",
    "apps.treatments",
    "apps.statistics",
    "apps.medicaltests",
]

# Apps de terceros instaladas en el proyecto
THIRD_APPS = [
    "corsheaders",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "simple_history",
    "drf_yasg",
]

# Lista de aplicaciones instaladas
INSTALLED_APPS = BASE_APPS + THIRD_APPS + LOCAL_APPS

# Configuración de Swagger
SWAGGER_SETTINGS = {
    "DOC_EXPANSION": "none",
}

# Configuración de REST Framework
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_PAGINATION_CLASS": "config.paginators.CustomResultSetPagination",
    "PAGE_SIZE": 10,
}

# Middleware utilizado en el proyecto
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "simple_history.middleware.HistoryRequestMiddleware",
]

# Configuración de CORS
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = (
    "http://localhost:4200",
    "https://tfg-project-jnub-git-feature-probar-d-c2a27d-anmamebos-projects.vercel.app/",
)
CORS_EXPOSE_HEADERS = ["Content-Disposition"]

# Configuración de plantillas
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

#  Configuración de urls
ROOT_URLCONF = "config.urls"

# Configuración de la aplicación WSGI
WSGI_APPLICATION = "config.wsgi.application"


# Configuración de la base de datos

# Configuración para trabajar con Docker
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'hospital_db',
#         'USER': 'user',
#         'PASSWORD': 'password',
#         'HOST': 'mysql',
#         'PORT': 3306
#     }
# }

# Configuración para trabajar en entorno local
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.mysql",
#         "NAME": "hospital_db",
#         "USER": "root",
#         "PASSWORD": "",
#         "HOST": "localhost",
#         "PORT": 3306,
#     }
# }

# Configuración para trabajar con base de datos en railway
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "railway",
        "USER": "root",
        "PASSWORD": "d5cGcD6g52DffGAD1Gch6-13hAegH-4c",
        "HOST": "viaduct.proxy.rlwy.net",
        "PORT": 20160,
    }
}

# Configuración de validación de contraseñas
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Configuración de internacionalización
LANGUAGE_CODE = "es-es"
TIME_ZONE = "Europe/Madrid"
USE_I18N = True
USE_TZ = False

# Modelo personalizado de usuario
AUTH_USER_MODEL = "users.User"

# Configuración de JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=45),
    "REFRESH_TOKEN_LIFETIME": timedelta(hours=3),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "TOKEN_OBTAIN_SERIALIZER": "apps.users.serializers.CustomTokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
}

# Configuración de archivos estáticos y multimedia
STATIC_URL = "static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"

# Configuraciçon de auto field
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Configuración de envío de emails

# Configuración para trabajar con Gmail
# EMAIL_HOST = "smtp.gmail.com"
# EMAIL_PORT = 587
# EMAIL_HOST_USER = ""
# EMAIL_HOST_PASSWORD = ""
# EMAIL_USE_TLS = True
# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

# Configuración para trabajar con Mailtrap
EMAIL_HOST = "sandbox.smtp.mailtrap.io"
EMAIL_HOST_USER = "369703b0b004e5"
EMAIL_HOST_PASSWORD = "766859eee6a844"
EMAIL_PORT = "2525"
EMAIL_USE_TLS = True
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
