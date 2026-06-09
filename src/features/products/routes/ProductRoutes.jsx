import { Route } from 'react-router-dom';
import Products from '../pages/Products';
import Product from '../pages/Product';

export const productRoutes = (
  <>
    <Route path="/products" element={<Products />} />
    <Route path="/product" element={<Product />} />
    <Route path="/product/:id" element={<Product />} />
  </>
);