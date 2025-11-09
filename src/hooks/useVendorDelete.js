// src/hooks/useVendorDelete.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteVendor } from '../services/vendorService';

export function useVendorDelete(options = {}) {
  const { onSuccess, onError } = options;
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  const handleDelete = (vendor) => {
    setVendorToDelete(vendor);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteVendor(vendorToDelete.VendorID);
      setShowDeleteModal(false);
      setVendorToDelete(null);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setShowDeleteModal(false);
      setVendorToDelete(null);
      
      if (onError) {
        onError(err);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setVendorToDelete(null);
  };

  return {
    showDeleteModal,
    vendorToDelete,
    handleDelete,
    confirmDelete,
    cancelDelete
  };
}