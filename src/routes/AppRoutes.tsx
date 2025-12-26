import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Header } from '../components/shared/Header';
import { Footer } from '../components/shared/Footer/Footer.tsx';
import { ScrollToTop } from '../components/shared/ScrollToTop';
import { Home } from '../pages/Home/Home';
import { AuthPage } from '../pages/AuthPage/AuthPage';
import { Cart } from '../pages/Cart/Cart';
import { Payment } from '../pages/Payment/Payment';
import { Delivery } from '../pages/Delivery/Delivery.tsx';
import { UserProfile } from '../pages/UserProfile/UserProfile.tsx';
import { Catalog } from '../pages/Catalog/Catalog.tsx';
import { About } from '../pages/About/About.tsx';
import { ProductPage } from '../pages/ProductPage/ProductPage.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';

const AppRoutes = () => {
  return (
      <BrowserRouter>
        <Header />
        <main>
          <ScrollToTop />
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
        </main>
        <Footer />
      </BrowserRouter>
  );
};

export default AppRoutes;
