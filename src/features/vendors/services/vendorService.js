// src/services/vendorService.js
import { apiRequest } from '../../shared/services/apiRequest';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchVendors = async () => {
  const data = await apiRequest(`${API_BASE_URL}/vendors`);
  return data.vendors;
};

export const fetchVendorById = async (id) => {
  const data = await apiRequest(`${API_BASE_URL}/vendors/${id}`);
  return data.vendor;
};

export const createVendor = async (vendorData) => {
  const data = await apiRequest(`${API_BASE_URL}/vendors`, {
    method: 'POST',
    body: JSON.stringify(vendorData),
  });
  return data;
};

export const updateVendor = async (vendorData) => {
  const data = await apiRequest(`${API_BASE_URL}/vendors`, {
    method: 'PUT',
    body: JSON.stringify(vendorData),
  });
  return data;
};

export const deleteVendor = async (id) => {
  const data = await apiRequest(`${API_BASE_URL}/vendors/${id}`, {
    method: 'DELETE',
  });
  return data;
};