import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { Footer, Header, ScrollToTop } from '@/components';
import { AppRoutes } from '@/routes';
import { theme } from '@/core/config';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>
          <ScrollToTop />
          <AppRoutes />
        </main>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
