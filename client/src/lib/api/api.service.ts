import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your server URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getProducts = () => api.get('/catalog/products');
export const addToCart = (data) => api.post('/cart/add', data);
export const checkout = (data) => api.post('/checkout', data);
// Add more API methods as needed
