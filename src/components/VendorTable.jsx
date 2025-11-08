// src/components/VendorTable.jsx
import Dropdown from 'react-bootstrap/Dropdown';

export default function VendorTable({ config }) {
  const {
    data = [],
    columns = ['VendorID', 'VendorName', 'VendorPhone', 'Email'],
    actions = null
  } = config || {};

  const handleAction = (action, item) => {
    switch (action) {
      case 'edit':
        console.log('Edit vendor:', item);
        // Add your edit logic here
        break;
      case 'details':
        console.log('View details:', item);
        // Add your details logic here
        break;
      case 'delete':
        console.log('Delete vendor:', item);
        // Add your delete logic here
        break;
      default:
        break;
    }
  };

  // Column configuration
  const columnConfig = {
    VendorID: { label: 'ID', field: 'VendorID' },
    VendorName: { label: 'Vendor Name', field: 'VendorName' },
    VendorPhone: { label: 'Phone', field: 'VendorPhone' },
    Email: { label: 'Email', field: 'Email' }
  };

  if (data.length === 0) {
    return <p className="text-muted">No data found.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th key={col}>{columnConfig[col]?.label || col}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.VendorID}>
              {columns.map((col) => {
                const field = columnConfig[col]?.field;
                return <td key={col}>{field ? item[field] : ''}</td>;
              })}
              {actions && (
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="sm">
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {actions.includes('edit') && (
                        <Dropdown.Item onClick={() => handleAction('edit', item)}>
                          <i className="bi bi-pencil-square me-2"></i>
                          Edit
                        </Dropdown.Item>
                      )}
                      {actions.includes('details') && (
                        <Dropdown.Item onClick={() => handleAction('details', item)}>
                          <i className="bi bi-info-circle me-2"></i>
                          Details
                        </Dropdown.Item>
                      )}
                      {(actions.includes('delete') && (actions.includes('edit') || actions.includes('details'))) && (
                        <Dropdown.Divider />
                      )}
                      {actions.includes('delete') && (
                        <Dropdown.Item 
                          onClick={() => handleAction('delete', item)}
                          className="text-danger"
                        >
                          <i className="bi bi-trash me-2"></i>
                          Delete
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}