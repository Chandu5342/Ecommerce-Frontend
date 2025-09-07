import axios from "axios";

const API = "https://ecommerce-backend-6lvv.onrender.com/api/cart";


export const getCart = (token) => {
  return axios.get(API, { headers: { Authorization: `Bearer ${token}` } });
};

export const addToCart = (productId, quantity = 1, token) =>
  axios.post(
    `${API}/add`,
    { productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const removeFromCart = (productId, token) =>
  axios.delete(`${API}/remove/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
