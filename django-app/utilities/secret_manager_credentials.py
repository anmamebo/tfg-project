import json
import os

from google.cloud import secretmanager_v1

PROJECT_ID = os.environ["GOOGLE_PROJECT_ID"]
SECRET_NAME = os.environ["GOOGLE_SECRET_NAME"]


# Configuración de secretos en Google Secret Manager
def get_secret():
    try:
        client = secretmanager_v1.SecretManagerServiceClient()
        name = "projects/{}/secrets/{}/versions/latest".format(PROJECT_ID, SECRET_NAME)
        response = client.access_secret_version(name=name)
        secret_payload = response.payload.data.decode("UTF-8")
        credentials = json.loads(secret_payload)
        return credentials

    except Exception as e:
        print(f"Error al obtener las credenciales desde Secret Manager: {e}")
        return None
