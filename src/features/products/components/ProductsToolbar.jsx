import { useLocation, useNavigate } from 'react-router-dom';

export default function ProductsToolbar({ config }) {

   const { isFetching: isLoading, handleRefresh: refreshAction } = config;
   const navigate = useNavigate();

   return (
      <div className="mb-3 p-2 border-bottom">
         <div className="d-flex gap-3">
            <a
               href="#"
               className="action-link text-primary text-decoration-none"
               onClick={(e) => {
                  e.preventDefault();
                  navigate('/product');
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
                  refreshAction();
               }}
               style={{
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.5 : 1
               }}
               title="Refresh"
            >
               <i className={`bi bi-arrow-clockwise me-1 ${isLoading ? 'spinner-border spinner-border-sm' : ''}`}></i>
               Refresh
            </a>
         </div>
      </div>
   )
}