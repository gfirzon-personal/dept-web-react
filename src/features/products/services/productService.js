// src/services/productService.js
import { apiRequest } from '../../shared/services/apiRequest';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProductsAsync = async () => {
  const data = await apiRequest(`${API_BASE_URL}/products`);
  return data.products;
};

export const fetchProductByIdAsync = async (id) => {
  console.log('Fetching product with ID:', id);
  
  const data = await apiRequest(`${API_BASE_URL}/products/${id}`);
  return data.product;
};

export const createProduct = async (productData) => {
  const data = await apiRequest(`${API_BASE_URL}/products`, {
    method: 'POST',
    body: JSON.stringify(productData),
  });
  return data;
};

export const updateProduct = async (productData) => {
  const data = await apiRequest(`${API_BASE_URL}/products`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
  return data;
};

export const deleteProduct = async (id) => {
  const data = await apiRequest(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  return data;
};
