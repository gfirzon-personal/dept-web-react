export default function Vendors() {
  return (
    <div className="container mt-5">
      <h1>Vendors</h1>
      <p>List of vendors will appear here.</p>
      
      <div className="d-flex justify-content-end mb-2">
        <button id="refreshBtn" className="btn btn-outline-secondary" title="Refresh">
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </div>
  );
}