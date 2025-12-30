import { Route } from 'react-router-dom';
import Products from '../pages/Products';
import EditVendor from '../pages/EditVendor';

export const productRoutes = (
  <>
    <Route path="/products" element={<Products />} />
    {/* <Route path="/products/add" element={<EditProduct />} />
    <Route path="/products/edit/:id" element={<EditProduct />} /> */}
  </>
);