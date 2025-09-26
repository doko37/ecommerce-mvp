import axios from 'axios';

const id = 'REST#1'; // Replace with actual restaurant ID as needed
const api = axios.create({
  baseURL: `http://localhost:3001`, // Adjust the baseURL as needed
});

const routesRequiringRestaurantId = ['/menu', '/cart', '/checkout', '/orders'];

api.interceptors.request.use((config) => {
    config.params = config.params || {};
    if (routesRequiringRestaurantId.some(route => config.url?.startsWith(route))) {
        config.params['restaurantId'] = id;
    }
    console.log('Request URL:', config.url);
    return config;
});

export default api;