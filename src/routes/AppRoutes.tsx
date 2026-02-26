import { Routes, Route } from 'react-router-dom';

import { About, AuthPage, Cart, Catalog, Delivery, Home, ProductPage, UserProfile } from '@/pages';
import { ProtectedRoute } from '@/routes';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/userProfile" element={<UserProfile />} />
      </Route>
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  );
};
