// src/contexts/VendorContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import * as vendorService from '../services/vendorService';

const VendorContext = createContext(null);

export function VendorProvider({ children }) {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all vendors
  const loadVendors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await vendorService.fetchVendors();
      setVendors(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a single vendor by ID (from cache or fetch)
  const getVendor = useCallback(async (id) => {
    // Try to find in cache first
    const cached = vendors.find(v => v.VendorID === id);
    if (cached) {
      return cached;
    }
    
    // If not in cache, fetch from API
    try {
      const data = await vendorService.fetchVendorById(id);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [vendors]);

  // Create a new vendor
  const createVendor = useCallback(async (vendorData) => {
    try {
      const newVendor = await vendorService.createVendor(vendorData);
      // Add to local state
      setVendors(prev => [...prev, newVendor]);
      return newVendor;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update an existing vendor
  const updateVendor = useCallback(async (vendorData) => {
    try {
      const updated = await vendorService.updateVendor(vendorData);
      // Update in local state
      setVendors(prev => 
        prev.map(v => v.VendorID === vendorData.VendorID ? updated : v)
      );
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Delete a vendor
  const deleteVendor = useCallback(async (id) => {
    try {
      await vendorService.deleteVendor(id);
      // Remove from local state
      setVendors(prev => prev.filter(v => v.VendorID !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    vendors,
    loading,
    error,
    loadVendors,
    getVendor,
    createVendor,
    updateVendor,
    deleteVendor,
    clearError
  };

  return (
    <VendorContext.Provider value={value}>
      {children}
    </VendorContext.Provider>
  );
}

// Custom hook to use the vendor context
export function useVendors() {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error('useVendors must be used within a VendorProvider');
  }
  return context;
}