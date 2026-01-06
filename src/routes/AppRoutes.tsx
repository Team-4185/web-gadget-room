import { Routes, Route } from 'react-router-dom';

import { About } from '@/pages/About/About';
import { AuthPage } from '@/pages/AuthPage/AuthPage';
import { Cart } from '@/pages/Cart/Cart';
import { Catalog } from '@/pages/Catalog/Catalog';
import { Delivery } from '@/pages/Delivery/Delivery';
import { Home } from '@/pages/Home/Home';
import { Payment } from '@/pages/Payment/Payment';
import { ProductPage } from '@/pages/ProductPage/ProductPage';
import { UserProfile } from '@/pages/UserProfile/UserProfile';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

const AppRoutes = () => {
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

export default AppRoutes;
