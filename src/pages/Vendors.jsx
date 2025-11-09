import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVendors } from '../services/vendorService';
import VendorTable from '../components/VendorTable';
import ConfirmModal from '../components/ConfirmModal';
import { useVendorDelete } from '../hooks/useVendorDelete';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    showDeleteModal,
    vendorToDelete,
    handleDelete,
    confirmDelete,
    cancelDelete
  } = useVendorDelete({
    onSuccess: async () => {
      await loadVendors();
    },
    onError: (err) => {
      setError(`Failed to delete vendor: ${err.message}`);
    }
  });

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

      {/* Action Buttons Row - Azure Portal Style */}
      <div className="mb-3 p-2 border-bottom">
        <div className="d-flex gap-3">
          <a
            href="#"
            className="action-link text-primary text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              navigate('/vendors/add');
            }}
            style={{ cursor: 'pointer' }}
            title="Add Vendor"
          >
            <i className="bi bi-plus me-1"></i>
            Add
          </a>
          <a
            href="#"
            className="action-link text-primary text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              if (!loading) loadVendors();
            }}
            style={{
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1
            }}
            title="Refresh"
          >
            <i className={`bi bi-arrow-clockwise me-1 ${loading ? 'spinner-border spinner-border-sm' : ''}`}></i>
            Refresh
          </a>
        </div>
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