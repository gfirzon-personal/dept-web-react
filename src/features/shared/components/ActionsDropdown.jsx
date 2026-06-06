import Dropdown from 'react-bootstrap/Dropdown';

function ActionsDropdown({ actions = [], item }) {
   return (
      <Dropdown align="end">
         <Dropdown.Toggle variant="secondary" size="sm">
            Actions
         </Dropdown.Toggle>
         <Dropdown.Menu
            renderOnMount
            popperConfig={{
               strategy: 'fixed',
               modifiers: [
                  {
                     name: 'preventOverflow',
                     options: {
                        boundary: 'viewport',
                        padding: 8,
                     },
                  },
                  {
                     name: 'flip',
                     options: {
                        fallbackPlacements: ['top-end', 'bottom-end', 'top-start', 'bottom-start'],
                     },
                  },
                  {
                     name: 'computeStyles',
                     options: {
                        adaptive: false,
                     },
                  },
               ],
            }}
         >
            {actions.map((action, actionIndex) => {
               const needsDivider = action.title?.toLowerCase().includes('delete') && actionIndex > 0;

               return (
                  <div key={actionIndex}>
                     {needsDivider && <Dropdown.Divider />}
                     <Dropdown.Item
                        onClick={() => action.onClick?.(item)}
                        className={action.className || ''}
                     >
                        {action.icon && <i className={`bi ${action.icon} me-2`}></i>}
                        {action.title}
                     </Dropdown.Item>
                  </div>
               );
            })}
         </Dropdown.Menu>
      </Dropdown>
   )
}

export default ActionsDropdown;