// src/contexts/VendorContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
//imports everything (all exported functions, objects, etc.) from the productService module located
import * as productService from '../services/productService';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load all vendors
    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.fetchProductsAsync();
            setProducts(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get a single product by ID (from cache or fetch)
    const getProduct = useCallback(async (id) => {
        // Try to find in cache first
        const cached = products.find(p => p.ProductID === id);
        if (cached) {
            return cached;
        }

        // If not in cache, fetch from API
        try {
            const data = await productService.fetchProductById(id);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, [products]);

    // Create a new product
    const createProduct = useCallback(async (productData) => {
        try {
            const newProduct = await productService.createProduct(productData);
            // Add to local state
            setProducts(prev => [...prev, newProduct]);
            return newProduct;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, []);

    // Update an existing product
    const updateProduct = useCallback(async (productData) => {
        try {
            const updated = await productService.updateProduct(productData);
            // Update in local state
            setProducts(prev =>
                prev.map(p => p.ProductID === productData.ProductID ? updated : p)
            );
            return updated;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, []);

    // Delete a product
    const deleteProduct = useCallback(async (id) => {
        try {
            await productService.deleteProduct(id);
            // Remove from local state
            setProducts(prev => prev.filter(p => p.ProductID !== id));
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
        products,
        loading,
        error,
        loadProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        clearError
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

// Custom hook to use the product context
export function useProducts() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}