from users.models import User
from unidecode import unidecode


def generate_doctor_username(name, last_name):
  # Quita los acentos y caracteres especiales
  name = unidecode(name)
  last_name = unidecode(last_name).split()[0]

  # Obtiene las iniciales del nombre y apellido 
  names = name.split()
  initial_name = ''.join([n[0].lower() for n in names])
  
  # Genera el nombre de usuario
  base_username = f"{initial_name}{last_name.lower()}"
  username = base_username[:30]
  
  # Añade un número al final del nombre de usuario si ya existe
  counter = 1
  while User.objects.filter(username=username).exists():
    username = f"{base_username[:28]}{counter}"
    counter += 1
    
  return username