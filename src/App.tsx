import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'modern-normalize/modern-normalize.css';

import { ProtectedRoute } from './routes/ProtectedRoute.tsx';
import { Header } from './components/shared/Header.tsx';
import { AuthPage } from './pages/AuthPage/AuthPage.tsx';
import { Home } from './pages/Home/Home.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import { Payment } from './pages/Payment/Payment.tsx';
import { Delivery } from './pages/Delivery/Delivery.tsx';
import { Catalog } from './pages/Catalog/Catalog.tsx';
import { About } from './pages/About/About.tsx';
import { ProductPage } from './pages/ProductPage/ProductPage.tsx';
import { Footer } from './components/shared/Footer/Footer.tsx';
import { ScrollToTop } from './components/shared/ScrollToTop.tsx';
import type { RootState } from './core/store/index.ts';
import { UserProfile } from './pages/UserProfile/UserProfile.tsx';

import './App.css';

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const productName = location.state?.name;

  const pageMap: Record<string, any> = {
    '/cart': 'Cart',
    '/auth': location.state?.mode === 'register' ? 'Register' : 'Login',
    '/delivery': 'Delivery',
    '/payment': 'Payment',
    '/catalog': 'Catalog',
    '/product/:id': 'ProductPage',
    '/': 'Home',
  };

  const page = pageMap[currentPath]; // undefined for other pages
  const cartLength = useSelector((state: RootState) => state.cart.cart.length);
  return (
    <div className="app-container">
      <Header page={page} orderLength={cartLength} product={productName} />
      <main className="content">
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
    </div>
  );
};
export default App;
