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

  // Action configuration for icons and styles
  const actionConfig = {
    edit: { icon: 'bi-pencil-square', label: 'Edit', className: '' },
    details: { icon: 'bi-info-circle', label: 'Details', className: '' },
    delete: { icon: 'bi-trash', label: 'Delete', className: 'text-danger' }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th key={col}>{columnConfig[col]?.label || col}</th>
            ))}
            {actions && actions.length > 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item[keyField]}>
              {columns.map((col) => {
                const field = columnConfig[col]?.field;
                return <td key={col}>{field ? item[field] : ''}</td>;
              })}
              {actions && actions.length > 0 && (
                <td>
                  <Dropdown>
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
  );
}