import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as vendorService from '../services/vendorService';
import ConfirmModal from '../../shared/components/ConfirmModal';
import PageTemplate from '../../shared/components/PageTemplate';
import PageHeaderPanel from '../../shared/components/PageHeaderPanel';
import VendorsToolbar from '../components/VendorsToolbar';
import PaginatedTable from '../../shared/components/PaginatedTable';
import FancySpinner from '../../shared/components/FancySpinner';

export default function Vendors() {
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [vendorToDelete, setVendorToDelete] = useState(null);
   const [deleteError, setDeleteError] = useState(null);

   const { data: vendors = [], isFetching, error, refetch } = useQuery({
      queryKey: ['vendors'],
      queryFn: vendorService.fetchVendors,
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   });

   const deleteMutation = useMutation({
      mutationFn: (id) => vendorService.deleteVendor(id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['vendors'] });
         setShowDeleteModal(false);
         setVendorToDelete(null);
         setDeleteError(null);
      },
      onError: (err) => {
         setDeleteError(`Failed to delete vendor: ${err.message}`);
         setShowDeleteModal(false);
         setVendorToDelete(null);
      },
   });

   const handleDelete = (vendor) => {
      setVendorToDelete(vendor);
      setShowDeleteModal(true);
      setDeleteError(null);
   };

   const confirmDelete = () => {
      deleteMutation.mutate(vendorToDelete.VendorID);
   };

   const cancelDelete = () => {
      setShowDeleteModal(false);
      setVendorToDelete(null);
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
            title: "Edit",
            icon: 'bi-pencil-square',
            className: 'text-primary',
            onClick: (data) => { navigate(`/vendor/${data.VendorID}`) }
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
      icon: "bi bi-truck",
      title: "Vendors",
      subtitle: "Browse and search vendor records",
      description: "View vendor information below."
   }

   const vendorToolbarConfig = {
      isFetching,
      handleRefresh
   }

   return (
      <PageTemplate>
         <PageHeaderPanel config={pagePanelConfig} />

         <div className="text-muted">
            <small>{vendors.length} total</small>
         </div>
         {/* Action Buttons Row - Azure Portal Style */}
         <VendorsToolbar config={vendorToolbarConfig} />

         {(error || deleteError) && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
               Error: {error?.message || deleteError}
               <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteError(null)}
               ></button>
            </div>
         )}

         {isFetching && !error ? (
            <FancySpinner config={{
               title: "Loading Vendors",
               description: "Fetching vendor data, please wait..."
            }} />
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