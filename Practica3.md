# Publicación de Aplicación en GitHub Pages

## Objetivo

El objetivo de esta práctica es proporcionar los pasos necesarios para publicar en GitHub Pages una aplicación MUY sencilla desarrollada en HTML y JavaScript, usando backendless como BaaS. 

**MUY IMPORTANTE:** Esta **NO** es una aplicación segura, es solo una demostración basada en la documentación de backendless.

## Pasos para Publicar en GitHub Pages

### 1. Crear una cuenta y una aplicación en Backendless

* Accede [Backendless](https://backendless.com/) y regístrate para obtener una cuenta gratuita (si no lo has hecho).
* Inicia sesión y crea una nueva aplicación. Anota el "Application ID" y la "REST API Key", ya que las necesitarás más adelante.

### 2. Generar archivos para el proyecto

Asegúrate de crear los siguientes 3 archivos, y después hacer COMMIT y SYNC para guardar los cambios:

#### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App para CRUD en Backendless</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Backendless CRUD App</h1>
    <div id="auth-container">
        <h2>Iniciar sesión</h2>
        <form id="login-form">
            <input type="email" id="login-email" placeholder="Email" required>
            <input type="password" id="login-password" placeholder="Contraseña" required>
            <button type="submit">Login</button>
        </form>
        <h2>Registrar</h2>
        <form id="register-form">
            <input type="email" id="register-email" placeholder="Email" required>
            <input type="password" id="register-password" placeholder="Contraseña" required>
            <button type="submit">Registrar</button>
        </form>
    </div>
    <div id="crud-container" style="display: none;">
        <h2>Productos</h2>
        <form id="product-form">
            <input type="text" id="product-name" placeholder="Nombre del producto" required>
            <input type="number" id="product-price" placeholder="Precio" required>
            <button type="submit">Agregar producto</button>
        </form>
        <div id="product-list"></div>
    </div>
    <script src="app.js"></script>
</body>
</html>
````

#### `styles.css`

```css
body {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 20px;
}

h1 {
    text-align: center;
}

form {
    margin-bottom: 20px;
}

input {
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
}

button {
    padding: 10px;
    width: 100%;
}

#product-list {
    margin-top: 20px;
}

.product-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}
```

#### `app.js`

```javascript
const APP_ID = 'YOUR_APP_ID';
const API_KEY = 'YOUR_REST_API_KEY';
const BASE_URL = `https://api.backendless.com/${APP_ID}/${API_KEY}`;
const USERS_ENDPOINT = `${BASE_URL}/users`;
const DATA_ENDPOINT = `${BASE_URL}/data/Products`;

document.getElementById('login-form').addEventListener('submit', loginUser);
document.getElementById('register-form').addEventListener('submit', registerUser);
document.getElementById('product-form').addEventListener('submit', addProduct);

function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    fetch(`${USERS_ENDPOINT}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            alert('User registered successfully');
            document.getElementById('register-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error registrando usuario');
        });
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch(`${USERS_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: email, password })
    })
        .then(response => response.json())
        .then(data => {
            alert('User logged in successfully');
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('crud-container').style.display = 'block';
            fetchProducts();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error de inicio de sesion');
        });
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;

    fetch(DATA_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price })
    })
        .then(response => response.json())
        .then(data => {
            alert('Producto agregado');
            fetchProducts();
            document.getElementById('product-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error agregando producto');
        });
}

function fetchProducts() {
    fetch(DATA_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <p>Name: ${product.name}</p>
                    <p>Price: ${product.price}</p>
                    <button onclick="deleteProduct('${product.objectId}')">Delete</button>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error obteniendo productos');
        });
}

function deleteProduct(productId) {
    fetch(`${DATA_ENDPOINT}/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            alert('Producto borrado con éxito');
            fetchProducts();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error borrando producto');
        });
}
```

Recuerda realizar el COMMIT y SYNC, ya que es muy importante para el paso 3 y 4.

### Credenciales de Backendless

Recuerda reemplazar `YOUR_APP_ID` y `YOUR_API_KEY` en el archivo `app.js` con los valores correspondientes de tu aplicación en Backendless.

Una vez que hayas completado estos pasos, tu aplicación debería estar publicada en GitHub Pages y accesible desde la URL pública proporcionada.


### 3. Configurar GitHub Pages

1. En tu repositorio, haz clic en el botón `Settings` (Configuración).
2. En el menú de la izquierda, selecciona `Pages`.
3. En la sección `Branch`, selecciona `main` (el nombre de tu rama principal) y luego `/ (root)`, asegurándote de que los archivos principales se encuentren en la raíz del repositorio.
4. Haz clic en `Save`.

### 4. Acceder a la Aplicación Publicada

1. El la sección de `Pages`, GitHub generará una URL para tu sitio web, algo similar a `https://<tu-usuario-github>.github.io/<nombre-del-repositorio>/`.
2. Espera unos minutos para que GitHub procese tu sitio.
3. Abre y prueba la URL generada para acceder a tu aplicación publicada.


## Fuentes:
* https://backendless.com/developers/#rest-api
* https://backendless.com/developers/#javascript
