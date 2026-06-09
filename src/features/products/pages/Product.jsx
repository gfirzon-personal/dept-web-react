import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ConfirmModal from '../../shared/components/ConfirmModal';
import PageTemplate from '../../shared/components/PageTemplate';
import PageHeaderPanel from '../../shared/components/PageHeaderPanel';
import FancySpinner from '../../shared/components/FancySpinner';
import * as productService from '../services/productService';
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
   const [error, setError] = useState(null);
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

   const {
      data: productData,
      isLoading,
      error: loadError,
      fetchStatus
   } = useQuery({
      queryKey: ['product', id],
      queryFn: () => productService.fetchProductByIdAsync(id),
      // That means on mount, React Query refetches only when data is stale.
      enabled: isEditMode,
      refetchOnWindowFocus: false,
   });

   useEffect(() => {
      // console.log("Fetch status:", fetchStatus);
   }, [fetchStatus]);

   useEffect(() => {
      if (!productData) {
         // console.warn('No product data found for ID:', id);
         return;
      }

      setProduct({
         ProductID: productData.ProductID || 0,
         ProductName: productData.ProductName || '',
         ProductDescription: productData.ProductDescription || '',
         UnitsInStock: productData.UnitsInStock || 0,
         SellPrice: productData.SellPrice || 0,
         DiscountPercentage: productData.DiscountPercentage || 0,
         UnitsMax: productData.UnitsMax || 0
      });
   }, [productData]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct(prev => ({
         ...prev,
         [name]: value
      }));
   };

   if (isLoading) {
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

   const handleSubmit = async (e) => {
      e.preventDefault();
      //  setSaving(true);
      //  setError(null);
      //  if (isEditMode) {
      //    updateVendorMutation.mutate(vendor, {
      //      onSettled: () => setSaving(false)
      //    });
      //    return;
      //  }
      //  else {
      //    const { VendorID, ...vendorData } = vendor;
      //    createVendorMutation.mutate(vendorData, {
      //      onSettled: () => setSaving(false)
      //    });
      //  }
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

               {error && (
                  <div className="alert alert-danger" role="alert">
                     Error: {error}
                  </div>
               )}

               {/* form goes here */}
               <div className="card">
                  <div className="card-body">
                     <form onSubmit={handleSubmit}>
                        {isEditMode && (
                           <div className="mb-3">
                              <div className="mb-3 text-end">
                                 <span className="fw-bold">KEY:</span>
                                 <span className="px-2 py-1 rounded" style={{ backgroundColor: '#e9ecef' }}>
                                    {product.ProductID}
                                 </span>
                              </div>
                           </div>
                        )}

                        <div className="mb-3">
                           <label htmlFor="ProductName" className="form-label">
                              Product Name <span className="text-danger">*</span>
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              id="ProductName"
                              name="ProductName"
                              value={product.ProductName}
                              onChange={handleChange}
                              maxLength={50}
                              required
                              disabled={saving}
                           />
                           <div className="form-text">Maximum 50 characters</div>
                        </div>

                        <div className="mb-3">
                           <label htmlFor="ProductDescription" className="form-label">
                              Product Description <span className="text-danger">*</span>
                           </label>
                           <textarea
                              rows={2}
                              className="form-control"
                              id="ProductDescription"
                              name="ProductDescription"
                              value={product.ProductDescription}
                              onChange={handleChange}
                              maxLength={250}
                              required
                              disabled={saving}
                           />
                           <div className="form-text">Maximum 250 characters</div>
                        </div>

                        <div className="parent-container d-flex" style={{ gap: '2rem' }}>
                           <div className="mb-3">
                              <label htmlFor="UnitsInStock" className="form-label">
                                 Units In Stock <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="number"
                                 className="form-control"
                                 id="UnitsInStock"
                                 name="UnitsInStock"
                                 value={product.UnitsInStock}
                                 onChange={handleChange}
                                 max={99999}
                                 required
                                 disabled={saving}
                              />
                              <div className="form-text">Maximum 99999</div>
                           </div>

                           <div className="mb-3">
                              <label htmlFor="SellPrice" className="form-label">
                                 Sell Price <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="number"
                                 className="form-control"
                                 id="SellPrice"
                                 name="SellPrice"
                                 value={product.SellPrice}
                                 onChange={handleChange}
                                 inputMode="decimal"
                                 min="0.00"
                                 max="9999999.99"
                                 step="0.01"
                                 required
                                 disabled={saving}
                              />
                              <div className="form-text">Maximum 9999999.99</div>
                           </div>

                           <div className="mb-3">
                              <label htmlFor="DiscountPercentage" className="form-label">
                                 Discount Percentage <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="number"
                                 className="form-control"
                                 id="DiscountPercentage"
                                 name="DiscountPercentage"
                                 value={product.DiscountPercentage}
                                 onChange={handleChange}
                                 min="0"
                                 max="100"
                                 required
                                 disabled={saving}
                              />
                              <div className="form-text">Maximum 100</div>
                           </div>
                        </div>

                     </form>
                  </div>
               </div>

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