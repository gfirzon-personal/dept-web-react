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

export const fetchVendorById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/vendors/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const updateVendor = async (vendorData) => {
  const response = await fetch(`${API_BASE_URL}/vendors`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vendorData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const deleteVendor = async (id) => {
  const response = await fetch(`${API_BASE_URL}/vendors/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};