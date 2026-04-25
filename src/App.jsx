import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { VendorProvider } from './features/vendors/contexts/VendorContext';
import { ProductProvider } from './features/products/contexts/ProductContext';
import TopMenu from './features/shared/components/TopMenu';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <VendorProvider>
        <ProductProvider>
          <div style={{
            minHeight: '100vh',
            background: '#f7f7f8',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto'
          }}>
            <TopMenu />
            <AppRoutes />
          </div>
        </ProductProvider>
      </VendorProvider>
    </Router>
  );
}