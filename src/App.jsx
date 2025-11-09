import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VendorProvider } from './contexts/VendorContext';
import TopMenu from './components/TopMenu';
import Home from './pages/Home';
import Vendors from './pages/Vendors';
import EditVendor from './pages/EditVendor';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <VendorProvider>
        <div style={{
          minHeight: '100vh',
          background: '#f7f7f8',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto'
        }}>
          <TopMenu />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/vendors/add" element={<EditVendor />} />
            <Route path="/vendors/edit/:id" element={<EditVendor />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </VendorProvider>
    </Router>
  );
}