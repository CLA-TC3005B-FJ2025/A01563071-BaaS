import os
import requests

# Cargar variables de entorno
from dotenv import load_dotenv
load_dotenv()

# Configurar Backendless
APP_ID = os.getenv('BACKENDLESS_APP_ID')
REST_API_KEY = os.getenv('BACKENDLESS_REST_API_KEY')
BASE_URL = f'https://api.backendless.com/{APP_ID}/{REST_API_KEY}/users'

# Registrar un nuevo usuario
def register_user(email, password):
    url = f'{BASE_URL}/register'
    headers = {'Content-Type': 'application/json'}
    user = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=user, headers=headers)
    print("Usuario registrado: ", response.json())

# Autenticar un usuario
def login_user(email, password):
    url = f'{BASE_URL}/login'
    headers = {'Content-Type': 'application/json'}
    user = {
        "login": email,
        "password": password
    }
    response = requests.post(url, json=user, headers=headers)
    if response.status_code == 200:
        print("Usuario autenticado: ", response.json())
    else:
        print("Error de autenticación: ", response.json())

if __name__ == "__main__":
    # Registrando un nuevo usuario
    register_user("test@tec.mx", "password123")
    # Autenticando al usuario registrado
    login_user("test@tec.mx", "password123")