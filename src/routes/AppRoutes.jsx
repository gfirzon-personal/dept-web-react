import { Routes, Route } from 'react-router-dom';
import { vendorRoutes } from '../features/vendors/routes/VendorRoutes';
import { productRoutes } from '../features/products/routes/ProductRoutes';
import About from '../features/contact/pages/About';
import Contact from '../features/contact/pages/Contact';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/about" element={<About />} />
      {vendorRoutes}
      {productRoutes}
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}