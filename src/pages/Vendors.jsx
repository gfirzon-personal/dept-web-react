import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVendors } from '../services/vendorService';
import VendorTable from '../components/VendorTable';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    console.log('Delete vendor:', vendor);
    // Add your delete logic here
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
      { name: 'edit', handler: handleEdit },
      { name: 'details', handler: handleDetails },
      { name: 'delete', handler: handleDelete }
    ],
    rowsPerPage: 10,  // Optional, defaults to 10
    rowsPerPageOptions: [5, 10, 25, 50, 100]  // Optional, defaults to [5, 10, 25, 50, 100]    
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
    </div>
  );
}