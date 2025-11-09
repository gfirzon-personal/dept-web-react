import { useState, useEffect } from 'react';
import { fetchVendors } from '../services/vendorService';
import VendorTable from '../components/VendorTable';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    actions: ['edit', 'details', 'delete']
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