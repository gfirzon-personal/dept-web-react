function PageHeaderPanel({ config }) {
   const panel = config 
   const title = panel.title ?? 'Details'
   const subtitle = panel.subtitle ?? 'Information'
   const icon = panel.icon ?? 'bi bi-card-text'
   const description = panel.description ?? `View ${title.toLowerCase()} information below.`

   return (
      <div className="cars-form-card mb-4 overflow-hidden">
         <div className="card-body">
            <div className="cars-form-header mb-3">
               <div className="home-icon-wrap cars-form-icon">
                  <i className={icon} aria-hidden="true"></i>
               </div>
               <div>
                  <span>{title}</span>
                  <h5 className="card-title mb-1">{subtitle}</h5>
                  <p className="text-secondary mb-0">{description}</p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default PageHeaderPanel;