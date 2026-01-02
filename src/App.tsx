import { BrowserRouter } from 'react-router-dom';

import { Header } from './components/shared/Header.tsx';
import { ScrollToTop } from './components/shared/ScrollToTop.tsx';
import { Footer } from './components/shared/Footer/Footer.tsx';
import AppRoutes from './routes/AppRoutes.tsx';

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
