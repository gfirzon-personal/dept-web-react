import { useState, useEffect } from 'react';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/vendors');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVendors(data.vendors);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Vendors</h1>
      
      <div className="d-flex justify-content-end mb-2">
        <button 
          id="refreshBtn" 
          className="btn btn-outline-secondary" 
          title="Refresh"
          onClick={fetchVendors}
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
      ) : vendors.length === 0 ? (
        <p className="text-muted">No vendors found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Vendor Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.VendorID}>
                  <td>{vendor.VendorID}</td>
                  <td>{vendor.VendorName}</td>
                  <td>{vendor.VendorPhone}</td>
                  <td>{vendor.Email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}