# Práctica: Autenticación de Usuarios con Backendless utilizando REST

## Objetivo

El objetivo de esta práctica es que los estudiantes aprendan a utilizar Backendless para autenticar usuarios usandao REST en una aplicación Python. También se cubrirá cómo crear nuevos usuarios. 

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

* Crea un archivo `usuarios.py` en el directorio raíz y agrega el siguiente código:

  ```python
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
  ```

### 2. Ejecutar la aplicación

* En la terminal, ejecuta:

  ```bash
  python usuarios.py
  ```

* Debes ver la salida de la consola mostrando que el usuario ha sido registrado y autenticado con éxito.

## Parte 4: Explicación del Código

* **Configuración de Backendless:** Se cargan las variables de entorno y se define la URL base para los servicios REST usando el App ID y el REST API Key.
* **Registrar un Usuario:** La función `register_user(email, password)` envía una solicitud POST a la URL de registro de usuarios, creando un nuevo usuario en la base de datos de Backendless.
* **Autenticar un Usuario:** La función `login_user(email, password)` envía una solicitud POST a la URL de inicio de sesión, autenticando al usuario registrado previamente.

## Fuentes:
* https://backendless.com/developers/#rest-api
* https://backendless.com/quick-start-guide-for-rest-api/

