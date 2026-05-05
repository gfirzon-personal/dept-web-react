import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import PaginatedTable from '../../shared/components/PaginatedTable';
import ConfirmModal from '../../shared/components/ConfirmModal';
import PageTemplate from '../../shared/components/PageTemplate';
import PageHeaderPanel from '../../shared/components/PageHeaderPanel';

export default function Products() {
   const navigate = useNavigate();
   const { products, loading, error, loadProducts, deleteProduct, clearError } = useProducts();
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [productToDelete, setProductToDelete] = useState(null);
   const [deleteError, setDeleteError] = useState(null);

   // This effect runs the loadProducts function when the component mounts 
   // or whenever the loadProducts reference changes.
   useEffect(() => {
      loadProducts();
   }, [loadProducts]);
   const handleDelete = (product) => {
      setProductToDelete(product);
      setShowDeleteModal(true);
      setDeleteError(null);
   };

   const confirmDelete = async () => {
      try {
         await deleteProduct(productToDelete.ProductID);
         setShowDeleteModal(false);
         setProductToDelete(null);
         setDeleteError(null);
      } catch (err) {
         setDeleteError(`Failed to delete product: ${err.message}`);
         setShowDeleteModal(false);
         setProductToDelete(null);
      }
   };

   const cancelDelete = () => {
      setShowDeleteModal(false);
      setProductToDelete(null);
      setDeleteError(null);
   };

   const handleRefresh = () => {
      if (!loading) {
         clearError();
         setDeleteError(null);
         loadProducts();
      }
   };

   // Define table configuration
   const tableConfig = {
      data: products,
      keyField: 'ProductID',
      columnConfig: {
         ProductID: { label: 'ID', field: 'ProductID' },
         ProductName: { label: 'Product Name', field: 'ProductName' },
         SellPrice: { label: 'Price', field: 'SellPrice' },
         ProductDescription: { label: 'Description', field: 'ProductDescription' }
      },
      actions: [
         {
            title: "Details",
            icon: 'bi-eye',
            className: 'text-success',
            onClick: (data) => { /* handler */ }
         },
         {
            title: "Edit",
            icon: 'bi-pencil-square',
            className: 'text-primary',
            onClick: (data) => { navigate(`/products/edit/${data.ProductID}`) }
         },
         {
            title: "Delete Product",
            icon: 'bi-trash',
            className: 'text-danger',
            onClick: handleDelete
         }
      ],
      rowsPerPage: 10,
      rowsPerPageOptions: [5, 10, 25, 50, 100]
   };

   const pagePanelConfig = {
      icon: "bi bi-tags",
      title: "Products",
      subtitle: "Browse and search product records",
      description: "Learn more about our products."
   }

   return (
      <PageTemplate>
         <PageHeaderPanel config={pagePanelConfig} />

         <div className="text-muted">
            <small>{products.length} total</small>
         </div>
         {/* Action Buttons Row - Azure Portal Style */}
         <div className="mb-3 p-2 border-bottom">
            <div className="d-flex gap-3">
               <a
                  href="#"
                  className="action-link text-primary text-decoration-none"
                  onClick={(e) => {
                     e.preventDefault();
                     navigate('/products/add');
                  }}
                  style={{ cursor: 'pointer' }}
                  title="Add Product"
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
            title="Delete Product"
            message={`Are you sure you want to delete product "${productToDelete?.ProductName}"?`}
            confirmText="Delete"
            cancelText="Cancel"
            confirmButtonClass="btn-danger"
         />
      </PageTemplate>
   );
}