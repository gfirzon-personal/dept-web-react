// src/pages/EditVendor.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ConfirmModal from '../../shared/components/ConfirmModal';
import PageTemplate from '../../shared/components/PageTemplate';
import PageHeaderPanel from '../../shared/components/PageHeaderPanel';
import FancySpinner from '../../shared/components/FancySpinner';
import { useVendors } from '../contexts/VendorContext';

const EMPTY_VENDOR = {
  VendorID: 0,
  VendorName: '',
  VendorPhone: '',
  Email: ''
};

export default function EditVendor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { getVendor, createVendor, updateVendor, deleteVendor } = useVendors();
  const queryClient = useQueryClient();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vendor, setVendor] = useState(EMPTY_VENDOR);

  const {
    data: vendorData,
    isLoading,
    error: loadError,
  } = useQuery({
    queryKey: ['vendor', id],
    queryFn: () => getVendor(id),
    // Only fetch vendor data if we're in edit mode (i.e., an ID is present)
    enabled: isEditMode,
    refetchOnWindowFocus: false,
  });

  const createVendorMutation = useMutation({
    mutationFn: (vendorData) => createVendor(vendorData),
    onSuccess: async () => {
      // Invalidate the 'vendors' query to ensure the list is updated with the new vendor
      // That pulls vendors data in Vendors component (refetching because the key was invalidated).
      await queryClient.invalidateQueries({ queryKey: ['vendors'] });
      navigate('/vendors', { state: { message: 'Vendor created successfully.' } });
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const updateVendorMutation = useMutation({
    mutationFn: (vendorData) => updateVendor(vendorData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['vendors'] });
      navigate('/vendors', { state: { message: 'Vendor updated successfully.' } });
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const deleteVendorMutation = useMutation({
    mutationFn: (vendorId) => deleteVendor(vendorId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['vendors'] });
      setShowDeleteModal(false);
      navigate('/vendors', { state: { message: 'Vendor deleted successfully.' } });
    },
    onError: (err) => {
      setError(`Failed to delete vendor: ${err.message}`);
      setShowDeleteModal(false);
    }
  });

  useEffect(() => {
    if (!vendorData) {
      return;
    }

    setVendor({
      VendorID: vendorData.VendorID || '',
      VendorName: vendorData.VendorName || '',
      VendorPhone: vendorData.VendorPhone || '',
      Email: vendorData.Email || ''
    });
  }, [vendorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    if (isEditMode) {
      updateVendorMutation.mutate(vendor, {
        onSettled: () => setSaving(false)
      });
      return;
    }
    else {
      const { VendorID, ...vendorData } = vendor;
      createVendorMutation.mutate(vendorData, {
        onSettled: () => setSaving(false)
      });
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setSaving(true);
    setError(null);
    deleteVendorMutation.mutate(vendor.VendorID, {
      onSettled: () => setSaving(false),
    });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCancel = () => {
    navigate('/vendors');
  };

  if (isLoading) {
    return (
      <FancySpinner config={{
        title: "Loading Vendor",
        description: "Fetching vendor data, please wait..."
      }} />
    );
  }

  const pagePanelConfig = {
    icon: "bi bi-truck",
    title: "Vendor Details",
    subtitle: isEditMode ? 'Edit Vendor' : 'Add Vendor',
    description: isEditMode ? 'Update vendor information' : 'Create a new vendor record'
  }

  return (
    <PageTemplate>
      <PageHeaderPanel config={pagePanelConfig} />

      <div className="row">
        <div className="col-md-12 offset-md-0">
          <div className="d-flex align-items-center gap-2 mb-4">
            <button
              className="btn btn-outline-secondary"
              onClick={handleCancel}
              disabled={saving}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Vendors
            </button>
            {isEditMode && (
              <button
                className="btn btn-outline-danger"
                onClick={handleDelete}
                disabled={saving}
              >
                <i className="bi bi-trash me-1"></i>
                Delete
              </button>
            )}
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              Error: {error}
            </div>
          )}

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {isEditMode && (
                  <div className="mb-3">
                    <div className="mb-3 text-end">
                      <span className="fw-bold">KEY:</span>
                      <span className="px-2 py-1 rounded" style={{ backgroundColor: '#e9ecef' }}>
                        {vendor.VendorID}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="VendorName" className="form-label">
                    Vendor Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="VendorName"
                    name="VendorName"
                    value={vendor.VendorName}
                    onChange={handleChange}
                    maxLength={50}
                    required
                    disabled={saving}
                  />
                  <div className="form-text">Maximum 50 characters</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="VendorPhone" className="form-label">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="VendorPhone"
                    name="VendorPhone"
                    value={vendor.VendorPhone}
                    onChange={handleChange}
                    maxLength={10}
                    required
                    disabled={saving}
                  />
                  <div className="form-text">Maximum 10 characters</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    name="Email"
                    value={vendor.Email}
                    onChange={handleChange}
                    maxLength={50}
                    required
                    disabled={saving}
                  />
                  <div className="form-text">Maximum 50 characters</div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {isEditMode ? 'Saving...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        {isEditMode ? 'Save Changes' : 'Create Vendor'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal - Only show in edit mode */}
      {isEditMode && (
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          title="Delete Vendor"
          message={`Are you sure you want to delete vendor "${vendor.VendorName}"?`}
          confirmText="Delete"
          cancelText="Cancel"
          confirmButtonClass="btn-danger"
        />
      )}
    </PageTemplate>
  );
}