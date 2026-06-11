import { useState } from 'react';
import ActionsDropdown from './ActionsDropdown';

export default function PaginatedTable({ config }) {
   const {
      data = [],
      columnConfig = {},
      keyField,
      actions = null,
      rowsPerPage = 10,
      rowsPerPageOptions = [5, 10, 25, 50, 100]
   } = config || {};

   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(rowsPerPage);
   const [filterText, setFilterText] = useState('');

   // Derive columns from columnConfig keys
   const columns = Object.keys(columnConfig);

   // Check if keyField is provided
   if (!keyField) {
      return (
         <div className="alert alert-danger" role="alert">
            Error: keyField is required in the table configuration.
         </div>
      );
   }

   if (data.length === 0) {
      return <p className="text-muted">No data found.</p>;
   }

   // Filter data across all visible column fields
   const filteredData = filterText.trim()
      ? data.filter((item) =>
         columns.some((col) => {
            const field = columnConfig[col]?.field;
            const value = field ? item[field] : '';
            return String(value ?? '').toLowerCase().includes(filterText.toLowerCase());
         })
      )
      : data;

   // Pagination calculations
   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const paginatedData = filteredData.slice(startIndex, endIndex);

   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const handlePrevious = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   const handleNext = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   const handleRowsPerPageChange = (e) => {
      const newItemsPerPage = parseInt(e.target.value);
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
   };

   const handleFilterChange = (e) => {
      setFilterText(e.target.value);
      setCurrentPage(1);
   };

   // Generate page numbers to display
   const getPageNumbers = () => {
      const pages = [];
      const maxPagesToShow = 5;

      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage < maxPagesToShow - 1) {
         startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
         pages.push(i);
      }

      return pages;
   };

   return (
      <div style={{ paddingBottom: '150px' }}>
         
         {/* Rows per page selector */}
         <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center">
               <label htmlFor="rowsPerPage" className="me-2 mb-0">Show</label>
               <select
                  id="rowsPerPage"
                  className="form-select form-select-sm"
                  style={{ width: 'auto' }}
                  value={itemsPerPage}
                  onChange={handleRowsPerPageChange}
               >
                  {rowsPerPageOptions.map(option => (
                     <option key={option} value={option}>{option}</option>
                  ))}
               </select>
               <span className="ms-2">entries</span>
            </div>

            <div className="d-flex align-items-center">
               <label htmlFor="tableFilter" className="me-2 mb-0">Filter:</label>
               <input
                  id="tableFilter"
                  type="text"
                  className="form-control form-control-sm"
                  style={{ width: '400px' }}
                  value={filterText}
                  onChange={handleFilterChange}
                  placeholder="Enter text to filter..."
               />
            </div>
         </div>

         <div className="table-responsive">
            <table className="table table-striped table-hover table-dark mb-0" style={{ marginBottom: '150px' }}>
               <thead className="table-dark">
                  <tr>
                     {columns.map((col) => (
                        <th key={col} className="text-start generic-th">{columnConfig[col]?.label || col}</th>
                     ))}
                     {actions && actions.length > 0 && <th className="text-start generic-th">Actions</th>}
                  </tr>
               </thead>
               <tbody>
                  {paginatedData.length === 0 && (
                     <tr>
                        <td colSpan={columns.length + (actions?.length > 0 ? 1 : 0)} className="text-center text-muted">
                           No matching records found.
                        </td>
                     </tr>
                  )}
                  {paginatedData.map((item, rowIndex) => (
                     <tr key={item[keyField]}>
                        {columns.map((col) => {
                           const maxLength = 20;
                           const field = columnConfig[col]?.field;
                           const cellValue = field ? item[field] : '';
                           const cellTextWs = cellValue !== null && cellValue !== undefined ? String(cellValue) : '';
                           const cellText = cellTextWs.substring(0, maxLength) + (cellTextWs.length > maxLength ? '...' : '');
                           return <td key={col} title={cellTextWs}>{cellText}</td>;
                        })}
                        {actions && actions.length > 0 && (
                           <td>
                              <ActionsDropdown actions={actions} item={item} />
                           </td>
                        )}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination Controls */}
         {totalPages >= 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
               <div className="text-muted">
                  Showing {filteredData.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                  {filterText.trim() && ` (filtered from ${data.length} total)`}
               </div>
               <nav>
                  <ul className="pagination mb-0">
                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handlePrevious} disabled={currentPage === 1}>
                           Previous
                        </button>
                     </li>

                     {getPageNumbers().map((pageNum) => (
                        <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                           <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                              {pageNum}
                           </button>
                        </li>
                     ))}

                     <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handleNext} disabled={currentPage === totalPages}>
                           Next
                        </button>
                     </li>
                  </ul>
               </nav>
            </div>
         )}
      </div>
   );
}