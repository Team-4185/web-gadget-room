import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { MuiProvider, RTKProvider, ToastProvider } from '@/core/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RTKProvider>
        <MuiProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </MuiProvider>
      </RTKProvider>
    </BrowserRouter>
  </StrictMode>
);
