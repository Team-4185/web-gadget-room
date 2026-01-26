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
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: 0,
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          margin: 0,
          '&.Mui-expanded': {
            margin: 0,
          },
        },
        root: {
          padding: '0 8px',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
  },
});
