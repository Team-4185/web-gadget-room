import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
        startIcon: {
          margin: '0px',
        },
        endIcon: {
          margin: '0px',
        },
      },
    },
  },
});
