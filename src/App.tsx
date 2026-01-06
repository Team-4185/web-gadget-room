import { BrowserRouter } from 'react-router-dom';

import { Header } from '@/components/shared/Header';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { Footer } from '@/components/shared/Footer/Footer';
import AppRoutes from '@/routes/AppRoutes';

import 'modern-normalize/modern-normalize.css';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <ScrollToTop />
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
