import axios from 'axios';
const API = 'https://ecommerce-backend-6lvv.onrender.com/api/auth';

export const signup = (data) =>{ 
        axios.post(`${API}/register`, data);
    }
export const login = (data) => axios.post(`${API}/login`, data);
