import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { vendorRoutes } from './VendorRoutes';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {vendorRoutes}
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}