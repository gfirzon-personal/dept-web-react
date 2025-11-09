// src/components/VendorTable.jsx
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function VendorTable({ config }) {
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

  // Pagination calculations
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

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
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Action configuration for icons and styles
  const actionConfig = {
    edit: { icon: 'bi-pencil-square', label: 'Edit', className: '' },
    details: { icon: 'bi-info-circle', label: 'Details', className: '' },
    delete: { icon: 'bi-trash', label: 'Delete', className: 'text-danger' }
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
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover" style={{ marginBottom: '150px' }}>
          <thead className="table-dark">
            <tr>
              {columns.map((col) => (
                <th key={col}>{columnConfig[col]?.label || col}</th>
              ))}
              {actions && actions.length > 0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <tr key={item[keyField]}>
                {columns.map((col) => {
                  const field = columnConfig[col]?.field;
                  return <td key={col}>{field ? item[field] : ''}</td>;
                })}
                {actions && actions.length > 0 && (
                  <td>
                    <Dropdown align="end" drop={rowIndex >= paginatedData.length - 2 ? "up" : "down"}>
                      <Dropdown.Toggle variant="secondary" size="sm">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {actions.map((action, index) => {
                          const config = actionConfig[action.name] || { 
                            icon: 'bi-gear', 
                            label: action.name, 
                            className: '' 
                          };
                          
                          const needsDivider = 
                            action.name === 'delete' && 
                            index > 0;

                          return (
                            <div key={action.name}>
                              {needsDivider && <Dropdown.Divider />}
                              <Dropdown.Item 
                                onClick={() => action.handler(item)}
                                className={config.className}
                              >
                                <i className={`bi ${config.icon} me-2`}></i>
                                {config.label}
                              </Dropdown.Item>
                            </div>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
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