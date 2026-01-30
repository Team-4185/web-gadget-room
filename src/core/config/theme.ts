import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  breakpoints: {
    values: {
      xs: 375,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          maxWidth: '1280px',

          [theme.breakpoints.down('xl')]: {
            maxWidth: '1140px',
          },
          [theme.breakpoints.down('lg')]: {
            maxWidth: '860px',
          },
          [theme.breakpoints.down('md')]: {
            maxWidth: '670px',
          },
          [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
        }),
      },
    },
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
