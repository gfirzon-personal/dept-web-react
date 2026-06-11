import { Route } from 'react-router-dom';
import Vendors from '../pages/Vendors';
import Vendor from '../pages/Vendor';

export const vendorRoutes = (
  <>
    <Route path="/vendors" element={<Vendors />} />
    <Route path="/vendor" element={<Vendor />} />
    <Route path="/vendor/:id" element={<Vendor />} />
  </>
);