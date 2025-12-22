import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VendorProvider } from './contexts/VendorContext';
import TopMenu from './components/TopMenu';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <VendorProvider>
        <div style={{
          minHeight: '100vh',
          background: '#f7f7f8',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto'
        }}>
          <TopMenu />          
          <AppRoutes />
        </div>
      </VendorProvider>
    </Router>
  );
}