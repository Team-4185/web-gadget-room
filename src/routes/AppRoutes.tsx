import { Routes, Route, Navigate } from 'react-router';

import {
  About,
  AuthPage,
  Cart,
  Catalog,
  Delivery,
  EmptyCart,
  Home,
  ProductPage,
  UserProfile,
  PageNotFound,
} from '@/pages';
import { ProtectedRoutes } from '@/routes/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/empty-cart" element={<EmptyCart />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Route>
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
