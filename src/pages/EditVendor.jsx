// src/pages/EditVendor.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchVendorById, updateVendor } from '../services/vendorService';

export default function EditVendor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [vendor, setVendor] = useState({
    VendorID: '',
    VendorName: '',
    VendorPhone: '',
    Email: ''
  });

  useEffect(() => {
    loadVendor();
  }, [id]);

  const loadVendor = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchVendorById(id);
      setVendor({
        VendorID: data.VendorID || '',
        VendorName: data.VendorName || '',
        VendorPhone: data.VendorPhone || '',
        Email: data.Email || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
    try {
      await updateVendor(vendor);
      navigate('/vendors');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/vendors');
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Edit Vendor</h1>
            <button
              className="btn btn-outline-secondary"
              onClick={handleCancel}
              disabled={saving}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Vendors
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              Error: {error}
            </div>
          )}

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="mb-3 text-end">
                    <span className="fw-bold">KEY:</span> <span className="px-2 py-1 rounded" style={{ backgroundColor: '#e9ecef' }}>{vendor.VendorID}</span>
                  </div>
                </div>

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
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        Save Changes
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
    </div>
  );
}