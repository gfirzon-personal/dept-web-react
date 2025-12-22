import Vendors from './pages/Vendors';
import EditVendor from './pages/EditVendor';
import { Route } from 'react-router-dom';

export const vendorRoutes = (
  <>
    <Route path="/vendors" element={<Vendors />} />
    <Route path="/vendors/add" element={<EditVendor />} />
    <Route path="/vendors/edit/:id" element={<EditVendor />} />
  </>
);