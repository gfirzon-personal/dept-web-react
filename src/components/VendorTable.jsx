// src/components/VendorTable.jsx
import Dropdown from 'react-bootstrap/Dropdown';

export default function VendorTable({ config }) {
  const {
    data = [],
    columnConfig = {},
    keyField,
    actions = null
  } = config || {};

  // Derive columns from columnConfig keys
  const columns = Object.keys(columnConfig);

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
            <tr key={item[keyField]}>
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