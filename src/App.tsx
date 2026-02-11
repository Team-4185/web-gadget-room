import { BrowserRouter } from 'react-router-dom';

import { Footer, Header, ScrollToTop } from '@/components';
import { AppRoutes } from '@/routes';
import { MuiProvider } from '@/core/providers';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <MuiProvider>
        <Header />
        <main>
          <ScrollToTop />
          <AppRoutes />
        </main>
        <Footer />
      </MuiProvider>
    </BrowserRouter>
  );
};

export default App;
