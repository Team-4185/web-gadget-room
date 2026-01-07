import { BrowserRouter } from 'react-router-dom';

import { Footer, Header, ScrollToTop } from '@/components';
import { AppRoutes } from '@/routes';

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
