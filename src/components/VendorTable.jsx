// src/components/VendorTable.jsx
export default function VendorTable({ vendors }) {
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
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.VendorID}>
              <td>{vendor.VendorID}</td>
              <td>{vendor.VendorName}</td>
              <td>{vendor.VendorPhone}</td>
              <td>{vendor.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}