import { Routes, Route } from 'react-router-dom';

import { About, AuthPage, Cart, Catalog, Delivery, Home, ProductPage, UserProfile } from '@/pages';
import { ProtectedRoutes } from '@/routes/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  );
};
