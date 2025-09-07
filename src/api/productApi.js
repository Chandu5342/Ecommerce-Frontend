import axios from 'axios';
const API = 'http://localhost:5000/api/products';

export const getProducts = (query = '') => {
  return axios.get(`${API}?${query}`);
};

export const createProduct = (data, token) =>
  axios.post(`${API}/addProduct`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateProduct = (id, data, token) =>
  axios.put(`${API}/update/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteProduct = (id, token) =>
  axios.delete(`${API}/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
