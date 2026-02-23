import { Routes, Route, Navigate } from 'react-router-dom';

import {
  About,
  AuthPage,
  Cart,
  Catalog,
  Delivery,
  Home,
  Payment,
  ProductPage,
  UserProfile,
  PageNotFound,
} from '@/pages';
import { ProtectedRoute } from '@/routes';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/userProfile" element={<UserProfile />} />
      </Route>
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
