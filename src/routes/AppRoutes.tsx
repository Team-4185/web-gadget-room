import { Routes, Route } from 'react-router-dom';

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
} from '@/pages';
import { ProtectedRoute } from '@/routes';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
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
