import { BrowserRouter } from 'react-router-dom';

import { Footer, Header, ScrollToTop } from '@/components';
import { AppRoutes } from '@/routes';
import { MuiProvider, RTKProvider, ToastProvider } from '@/core/providers';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <RTKProvider>
        <MuiProvider>
          <ToastProvider>
            <Header />
            <main>
              <ScrollToTop />
              <AppRoutes />
            </main>
            <Footer />
          </ToastProvider>
        </MuiProvider>
      </RTKProvider>
    </BrowserRouter>
  );
};

export default App;
