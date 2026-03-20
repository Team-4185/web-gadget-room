import { Routes, Route, Navigate } from 'react-router-dom';

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
  AdminPanel,
  AdminProducts,
  AdminCustomers,
  AdminOrders,
  PageNotFound,
} from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      {/* <Route element={<ProtectedRoutes />}> */}
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/empty-cart" element={<EmptyCart />} />
      <Route path="/delivery" element={<Delivery />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/adminPanel/products" element={<AdminProducts />} />
        <Route path="/adminPanel/orders" element={<AdminOrders />} />
        <Route path="/adminPanel/customers" element={<AdminCustomers />} />
        <Route path="/catalog" element={<Catalog />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<ProductPage />} />
      {/* </Route> */}
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
