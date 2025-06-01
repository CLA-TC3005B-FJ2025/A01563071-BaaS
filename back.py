import os
import requests

# Cargar variables de entorno
from dotenv import load_dotenv
load_dotenv()

# Configurar Backendless
APP_ID = os.getenv('BACKENDLESS_APP_ID')
REST_API_KEY = os.getenv('BACKENDLESS_REST_API_KEY')
BASE_URL = f'https://api.backendless.com/{APP_ID}/{REST_API_KEY}/data/Person'

# Crear un objeto Person
def save_person():
    url = BASE_URL
    headers = {'Content-Type': 'application/json'}
    person = {
        "name": "John Doe",
        "age": 30
    }
    response = requests.post(url, json=person, headers=headers)
    try:
        response.raise_for_status()  # Generar un error para respuestas no exitosas
        print("Objeto guardado: ", response.json())
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        print("Error response: ", response.text)
    except requests.exceptions.RequestException as req_err:
        print(f"Other error occurred: {req_err}")
        print("Error response: ", response.text)
    except requests.exceptions.JSONDecodeError:
        print("Error al decodificar JSON, respuesta no contiene JSON:", response.text)

# Obtener todos los objetos Person
def fetch_all_persons():
    url = BASE_URL
    headers = {'Content-Type': 'application/json'}
    response = requests.get(url, headers=headers)
    try:
        response.raise_for_status()  # Generar un error para respuestas no exitosas
        persons = response.json()
        print("Objetos obtenidos: ", persons)
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error: {http_err}")
        print("Error response: ", response.text)
    except requests.exceptions.RequestException as req_err:
        print(f"Other error occurred: {req_err}")
        print("Error response: ", response.text)
    except requests.exceptions.JSONDecodeError:
        print("Error al decodificar JSON, respuesta no contiene JSON:", response.text)

if __name__ == "__main__":
    # Guardar un nuevo objeto Person
    save_person()

    
    # Obtener todos los objetos Person
    fetch_all_persons()