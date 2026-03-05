import { BrowserRouter } from 'react-router-dom';

import { Footer, Header, ScrollToTop } from '@/components';
import { AppRoutes } from '@/routes';
import { MuiProvider, RTKProvider } from '@/core/providers';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <RTKProvider>
        <MuiProvider>
          <Header />
          <main>
            <ScrollToTop />
            <AppRoutes />
          </main>
          <Footer />
        </MuiProvider>
      </RTKProvider>
    </BrowserRouter>
  );
};

export default App;
