import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVendors, deleteVendor } from '../services/vendorService';
import VendorTable from '../components/VendorTable';
import ConfirmModal from '../components/ConfirmModal';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);
  const navigate = useNavigate();

  const loadVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchVendors();
      setVendors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  // Define action handlers
  const handleEdit = (vendor) => {
    navigate(`/vendors/edit/${vendor.VendorID}`);
  };

  const handleDetails = (vendor) => {
    console.log('View details:', vendor);
    // Add your details logic here
  };

  const handleDelete = (vendor) => {
    setVendorToDelete(vendor);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteVendor(vendorToDelete.VendorID);
      setShowDeleteModal(false);
      setVendorToDelete(null);
      // Refresh the vendors list after successful deletion
      await loadVendors();
    } catch (err) {
      setError(`Failed to delete vendor: ${err.message}`);
      setShowDeleteModal(false);
      setVendorToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setVendorToDelete(null);
  };

  // Define table configuration
  const tableConfig = {
    data: vendors,
    keyField: 'VendorID',
    columnConfig: {
      VendorID: { label: 'ID', field: 'VendorID' },
      VendorName: { label: 'Vendor Name', field: 'VendorName' },
      VendorPhone: { label: 'Phone', field: 'VendorPhone' },
      Email: { label: 'Email', field: 'Email' }
    },
    actions: [
      {
        title: "Details",
        icon: 'bi-info-circle',
        className: 'text-success',
        onClick: (data) => { /* handler */ }
      },
      {
        title: "Edit",
        icon: 'bi-pencil-square',
        className: 'text-primary',
        onClick: (data) => { navigate(`/vendors/edit/${data.VendorID}`) }
      },      
      {
        title: "Delete Vendor",
        icon: 'bi-trash',
        className: 'text-danger',
        onClick: handleDelete
      }
    ],
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25, 50, 100]    
  };

  return (
    <div className="container mt-5">
      <h1>Vendors</h1>

      <div className="d-flex justify-content-end mb-2">
        <button
          id="refreshBtn"
          className="btn btn-outline-secondary"
          title="Refresh"
          onClick={loadVendors}
          disabled={loading}
        >
          <i className={`bi bi-arrow-clockwise ${loading ? 'spinner-border spinner-border-sm' : ''}`}></i>
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error loading vendors: {error}
        </div>
      )}

      {loading && !error ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <VendorTable config={tableConfig} />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Vendor"
        message={`Are you sure you want to delete vendor "${vendorToDelete?.VendorName}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="btn-danger"
      />
    </div>
  );
}