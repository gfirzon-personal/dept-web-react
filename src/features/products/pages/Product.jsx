import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ConfirmModal from '../../shared/components/ConfirmModal';
import PageTemplate from '../../shared/components/PageTemplate';
import PageHeaderPanel from '../../shared/components/PageHeaderPanel';
import FancySpinner from '../../shared/components/FancySpinner';
import * as productService from '../services/ProductService';
import ProductToolbar from '../components/ProductToolbar';

const EMPTY_PRODUCT = {
   ProductID: 0,
   ProductName: '',
   ProductDescription: '',
   UnitsInStock: 0,
   DiscountPercentage: 0,
   UnitsMax: 0
};

export default function Product() {
   const [saving, setSaving] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);

   const navigate = useNavigate();
   const { id } = useParams();
   const isEditMode = Boolean(id);

   const [product, setProduct] = useState(EMPTY_PRODUCT);

   const pagePanelConfig = {
      icon: "bi bi-truck",
      title: "Product Details",
      subtitle: isEditMode ? 'Edit Product' : 'Add Product',
      description: isEditMode ? 'Update product information' : 'Create a new product record'
   }

   const { data: productData, isFetching, error, refetch } = useQuery({
      queryKey: ['products', id],
      queryFn: () => productService.fetchProductByIdAsync(id),
      staleTime: 5 * 60 * 1000,
      // That means on mount, React Query refetches only when data is stale.
      enabled: isEditMode,
      refetchOnWindowFocus: false,
   });

   if (isFetching) {
      return (
         <FancySpinner config={{
            title: "Loading Product",
            description: "Fetching product data, please wait..."
         }} />
      );
   }

   const confirmDelete = async () => {
      setSaving(true);
      setError(null);
      // deleteVendorMutation.mutate(vendor.VendorID, {
      //    onSettled: () => setSaving(false),
      // });
   };

   const cancelDelete = () => {
      setShowDeleteModal(false);
   };

   const handleCancel = () => {
      navigate('/products');
   };

   const handleDelete = () => {
      setShowDeleteModal(true);
   };

   return (
      <PageTemplate>
         <PageHeaderPanel config={pagePanelConfig} />

         <div className="row">
            <div className="col-md-12 offset-md-0">
               <ProductToolbar
                  config={{
                     isEditMode, saving, handleCancel, handleDelete
                  }}
               />
            </div>
         </div>

         {/* Delete Confirmation Modal - Only show in edit mode */}
         {isEditMode && (
            <ConfirmModal
               isOpen={showDeleteModal}
               onClose={cancelDelete}
               onConfirm={confirmDelete}
               title="Delete Product"
               message={`Are you sure you want to delete product "${product.ProductName}"?`}
               confirmText="Delete"
               cancelText="Cancel"
               confirmButtonClass="btn-danger"
            />
         )}

      </PageTemplate>
   );
}