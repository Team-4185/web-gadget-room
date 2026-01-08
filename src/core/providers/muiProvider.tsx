import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { theme } from '@/core/config';

export const MuiProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
