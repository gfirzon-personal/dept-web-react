// src/components/VendorTable.jsx
import Dropdown from 'react-bootstrap/Dropdown';

export default function VendorTable({ vendors }) {
  const handleAction = (action, vendor) => {
    switch (action) {
      case 'edit':
        console.log('Edit vendor:', vendor);
        // Add your edit logic here
        break;
      case 'details':
        console.log('View details:', vendor);
        // Add your details logic here
        break;
      case 'delete':
        console.log('Delete vendor:', vendor);
        // Add your delete logic here
        break;
      default:
        break;
    }
  };

  if (vendors.length === 0) {
    return <p className="text-muted">No vendors found.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Vendor Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.VendorID}>
              <td>{vendor.VendorID}</td>
              <td>{vendor.VendorName}</td>
              <td>{vendor.VendorPhone}</td>
              <td>{vendor.Email}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" size="sm">
                    Actions
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleAction('edit', vendor)}>
                      <i className="bi bi-pencil-square me-2"></i>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAction('details', vendor)}>
                      <i className="bi bi-info-circle me-2"></i>
                      Details
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item 
                      onClick={() => handleAction('delete', vendor)}
                      className="text-danger"
                    >
                      <i className="bi bi-trash me-2"></i>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}