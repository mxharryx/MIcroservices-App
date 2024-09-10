document.addEventListener('DOMContentLoaded', () => {

    const apiUrl = 'http://localhost:3000'; // Change this to match your services' URLs

    // Register User
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        
        const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
        alert('User registered successfully');
    } else {
        alert('Failed to register');
    }
});

    // Login User
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Login successful');
        fetchProducts();
    } else {
        alert('Login failed');
    }
    });

    // Fetch Products
    async function fetchProducts() {
        const productsDiv = document.getElementById('products');
      productsDiv.innerHTML = ''; // Clear the list
    const response = await fetch('http://localhost:3001/products');
    const products = await response.json();
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `<strong>${product.name}</strong> - ${product.price} USD (ID: ${product._id})`;
        productsDiv.appendChild(productElement);
    });
    }

    // Place an Order
    document.getElementById('orderForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const productId = document.getElementById('orderProductId').value;
        const quantity = document.getElementById('orderQuantity').value;

        const token = localStorage.getItem('token');
        if (!token) {
        alert('Please login first');
        return;
    }
    
    const response = await fetch('http://localhost:3002/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
    });

    if (response.ok) {
        alert('Order placed successfully');
    } else {
        alert('Failed to place order');
    }
    });
});