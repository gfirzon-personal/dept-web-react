// src/services/vendorService.js
const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchVendors = async () => {
  const response = await fetch(`${API_BASE_URL}/vendors`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.vendors;
};