# Práctica: Integración de Backendless con una aplicación Python en Codespaces utilizando REST

## Objetivo

El objetivo de esta práctica es que los estudiantes aprendan a utilizar Backendless, un Backend as a Service (BaaS), para desarrollar una aplicación Python utilizando servicios REST. 

## Requisitos Previos

- Acceso a GitHub Codespaces.
- Cuenta en Backendless.com (puede ser una cuenta gratuita).

## Parte 1: Configuración Inicial

### 1. Instalar las dependencias necesarias

* Ejecuta el siguiente comando para instalar las dependencias:

  ```bash
  pip install requests python-dotenv
  ```

## Parte 2: Configuración de Backendless

### 1. Crear una cuenta y una aplicación en Backendless

* Accede [Backendless](https://backendless.com/) y regístrate para obtener una cuenta gratuita.
* Inicia sesión y crea una nueva aplicación. Anota el "Application ID" y la "REST API Key", ya que las necesitarás más adelante.

### 2. Configurar el entorno de desarrollo para Backendless

* Crea un archivo `.env` en el directorio raíz de tu Codespace y agrega las siguientes líneas, reemplazando `YOUR_APP_ID` y `YOUR_API_KEY` con los valores correspondientes:

  ```dotenv
  BACKENDLESS_APP_ID=YOUR_APP_ID
  BACKENDLESS_REST_API_KEY=YOUR_REST_API_KEY
  ```
## Parte 3: Desarrollo de la Aplicación

### 1. Crear la estructura del proyecto

* Crea un archivo `back.py` en el directorio raíz y agrega el siguiente código:

  ```python
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
  ```

### 2. Ejecutar la aplicación

* En la terminal, ejecuta:

  ```bash
  python back.py
  ```

* Debes ver la salida de la consola mostrando que el objeto ha sido guardado y recuperado de la base de datos.
* Recuerda hacer COMMIT y SYNC para guardar los cambios en tu repositorio

## Parte 4: Explicación del Código

* **Configuración de Backendless:** Se cargan las variables de entorno y se define la URL base para los servicios REST usando el App ID y el REST API Key.
* **Guardar un Objeto:** La función `save_person()` envía una solicitud POST a la URL de la tabla `Person`, guardando el objeto `person` en la base de datos de Backendless.
* **Consultar Objetos:** La función `fetch_all_persons()` envía una solicitud GET a la misma URL para recuperar todos los objetos de la tabla `Person`.

## Fuentes:
* https://backendless.com/developers/#rest-api
* https://backendless.com/quick-start-guide-for-rest-api/


