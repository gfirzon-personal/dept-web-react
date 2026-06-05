import { useLocation, useNavigate } from 'react-router-dom';

function ActionsToolbar({ config }) {

   const { isFetching: isLoading, handleRefresh: loadVendors } = config;
   const navigate = useNavigate();

   return (
      <>
         <div className="mb-3 p-2 border-bottom">
            <div className="d-flex gap-3">
               <a
                  href="#"
                  className="action-link text-primary text-decoration-none"
                  onClick={(event) => {
                     event.preventDefault();
                     navigate('/vendor');
                  }}
                  style={{ cursor: 'pointer' }}
                  title="Add Vendor"
               >
                  <i className="bi bi-plus me-1"></i>
                  Add
               </a>
               <a
                  href="#"
                  className="action-link text-primary text-decoration-none"
                  onClick={(event) => {
                     event.preventDefault();
                     if (!isLoading) {
                        loadVendors();
                     }
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
      </>
   )
}

export default ActionsToolbar;