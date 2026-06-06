function FancySpinner({ config }) {
  const { title = "Loading...", description = "" } = config || {};

  return (
    <div className="fancy-spinner-wrap my-5" aria-live="polite" aria-busy="true">
      <div className="fancy-spinner" role="status">
        <span className="visually-hidden">{title}</span>
      </div>
      <p className="fancy-spinner-label mt-3 mb-0">{title}</p>
      {description && <small className="text-muted">{description}</small>}
    </div>
  );
}

export default FancySpinner;