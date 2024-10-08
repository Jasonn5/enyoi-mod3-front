// utils/ApiFetch.js
const ApiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('authToken'); // Obtener token de localStorage
    const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Agregar el token si existe
    };

    const config = {
        method: options.method || 'GET',
        headers: headers,
        ...(options.body && { body: JSON.stringify(options.body) }), // Convertir body a JSON si existe
    };

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, config);
        const data = await response.json();
        return { ok: response.ok, data };
    } catch (error) {
        console.error('Error en la petición:', error);
        throw new Error('Error en la conexión');
    }
};

export default ApiFetch;
