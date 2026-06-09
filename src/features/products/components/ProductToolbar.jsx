import { useLocation, useNavigate } from 'react-router-dom';

export default function ProductToolbar({ config }) {
   const { isEditMode, saving, handleCancel, handleDelete } = config;
   const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center gap-2 mb-4">
            <button
                className="btn btn-outline-secondary"
                onClick={handleCancel}
                disabled={saving}
            >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Products
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
    )
}