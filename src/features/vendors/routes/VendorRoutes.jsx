import { Route } from 'react-router-dom';
import Vendors from '../pages/Vendors';
import EditVendor from '../pages/EditVendor';

export const vendorRoutes = (
  <>
    <Route path="/vendors" element={<Vendors />} />
    <Route path="/vendor" element={<EditVendor />} />
    <Route path="/vendor/:id" element={<EditVendor />} />
  </>
);