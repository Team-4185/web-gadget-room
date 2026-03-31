import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { MuiProvider, RTKProvider, ToastProvider } from '@/core/providers';
import { router } from '@/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RTKProvider>
      <MuiProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </MuiProvider>
    </RTKProvider>
  </StrictMode>
);
