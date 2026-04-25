import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendors } from '../contexts/VendorContext';
import PaginatedTable from '../../shared/components/PaginatedTable';
import ConfirmModal from '../../shared/components/ConfirmModal';
import PageTemplate from '../../shared/components/PageTemplate';
import PageHeaderPanel from '../../shared/components/PageHeaderPanel';

export default function Vendors() {
  const navigate = useNavigate();
  const { vendors, loading, error, loadVendors, deleteVendor, clearError } = useVendors();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // This effect runs the loadVendors function when the component mounts 
  // or whenever the loadVendors reference changes.
  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  const handleDelete = (vendor) => {
    setVendorToDelete(vendor);
    setShowDeleteModal(true);
    setDeleteError(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteVendor(vendorToDelete.VendorID);
      setShowDeleteModal(false);
      setVendorToDelete(null);
      setDeleteError(null);
    } catch (err) {
      setDeleteError(`Failed to delete vendor: ${err.message}`);
      setShowDeleteModal(false);
      setVendorToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setVendorToDelete(null);
    setDeleteError(null);
  };

  const handleRefresh = () => {
    if (!loading) {
      clearError();
      setDeleteError(null);
      loadVendors();
    }
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

  const pagePanelConfig = {
    icon: "bi bi-info-circle",
    title: "Vendors",
    subtitle: "Browse and search vendor records",
    description: "Learn more about our vendors."
  }

  return (
    <PageTemplate>
      <PageHeaderPanel config={pagePanelConfig} />
      <div className="d-flex justify-content-between align-items-center mb-4">

      </div>

      <div className="text-muted">
        <small>{vendors.length} total</small>
      </div>
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
              handleRefresh();
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

      {(error || deleteError) && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Error: {error || deleteError}
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              clearError();
              setDeleteError(null);
            }}
          ></button>
        </div>
      )}

      {loading && !error ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <PaginatedTable config={tableConfig} />
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
    </PageTemplate>
  );
}