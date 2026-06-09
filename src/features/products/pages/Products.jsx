import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useProducts } from '../contexts/ProductContext';
import PaginatedTable from '../../shared/components/PaginatedTable';
import ConfirmModal from '../../shared/components/ConfirmModal';
import PageTemplate from '../../shared/components/PageTemplate';
import PageHeaderPanel from '../../shared/components/PageHeaderPanel';
import ProductsToolbar from '../components/ProductsToolbar';
import FancySpinner from '../../shared/components/FancySpinner';
import * as productService from '../services/ProductService';

export default function Products() {
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [productToDelete, setProductToDelete] = useState(null);
   const [deleteError, setDeleteError] = useState(null);

   const { data: products = [], isFetching, error, refetch } = useQuery({
      queryKey: ['products'],
      queryFn: productService.fetchProductsAsync,
      staleTime: 5 * 60 * 1000,
      // That means on mount, React Query refetches only when data is stale.
      refetchOnMount: true,
      refetchOnWindowFocus: false,
   });

   const deleteMutation = useMutation({
      mutationFn: (id) => productService.deleteProduct(id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['products'] });
         setShowDeleteModal(false);
         setProductToDelete(null);
         setDeleteError(null);
      },
      onError: (err) => {
         setDeleteError(`Failed to delete product: ${err.message}`);
         setShowDeleteModal(false);
         setProductToDelete(null);
      },
   });   

   const handleDelete = (product) => {
      setProductToDelete(product);
      setShowDeleteModal(true);
      setDeleteError(null);
   };

   const confirmDelete = async () => {
      deleteMutation.mutate(productToDelete.ProductID);
      // try {
      //    await deleteProduct(productToDelete.ProductID);
      //    setShowDeleteModal(false);
      //    setProductToDelete(null);
      //    setDeleteError(null);
      // } catch (err) {
      //    setDeleteError(`Failed to delete product: ${err.message}`);
      //    setShowDeleteModal(false);
      //    setProductToDelete(null);
      // }
   };

   const cancelDelete = () => {
      setShowDeleteModal(false);
      setProductToDelete(null);
      setDeleteError(null);
   };

   const handleRefresh = () => {
      if (!isFetching) {
         setDeleteError(null);
         refetch();
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

  if (isFetching) {
    return (
      <FancySpinner config={{
        title: "Loading Products",
        description: "Fetching product data, please wait..."
      }} />
    );
  }   

   return (
      <PageTemplate>
         <PageHeaderPanel config={pagePanelConfig} />

         <div className="text-muted">
            <small>{products.length} total</small>
         </div>
         {/* Action Buttons Row - Azure Portal Style */}
         <ProductsToolbar config={{ isFetching, handleRefresh }} />

         {(error || deleteError) && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
               Error: {error || deleteError}
               <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                     setDeleteError(null);
                  }}
               ></button>
            </div>
         )}

         <PaginatedTable config={tableConfig} />

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