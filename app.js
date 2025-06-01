const APP_ID = '2FE264C5-68B5-4075-ACC8-0FB70DF73969'; 
const API_KEY = 'D57B4074-BC66-48F6-9640-482AE669B383'; 
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
        alert('Usuario registrado correctamente');
        document.getElementById('register-form').reset();
    })
    .catch(error => {
        console.error('Error registrando:', error);
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
        alert('Inicio de sesión exitoso');
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('crud-container').style.display = 'block';
        fetchProducts();
    })
    .catch(error => {
        console.error('Error iniciando sesión:', error);
        alert('Error de inicio de sesión');
    });
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);

    fetch(DATA_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price })
    })
    .then(response => response.json())
    .then(data => {
        alert('Producto agregado correctamente');
        fetchProducts();
        document.getElementById('product-form').reset();
    })
    .catch(error => {
        console.error('Error agregando producto:', error);
        alert('Error al agregar producto');
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
                <p><strong>Nombre:</strong> ${product.name}</p>
                <p><strong>Precio:</strong> $${product.price}</p>
                <button onclick="deleteProduct('${product.objectId}')">Eliminar</button>
            `;
            productList.appendChild(productItem);
        });
    })
    .catch(error => {
        console.error('Error obteniendo productos:', error);
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
    .then(() => {
        alert('Producto eliminado');
        fetchProducts();
    })
    .catch(error => {
        console.error('Error eliminando producto:', error);
        alert('Error eliminando producto');
    });
}