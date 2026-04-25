/*
   children is a special reserved prop name in React. 
   When you nest JSX elements inside a component's opening and closing tags, 
   React automatically passes them as props.children (or via destructuring, just children). 
   It's not a JavaScript language keyword, 
   but React treats it as a built-in prop name with special meaning.
*/
function PageTemplate({ children }) {
   return (
      <div className="container py-4">
         <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-10">
               {children}
            </div>
         </div>
      </div>
   );
}

export default PageTemplate;