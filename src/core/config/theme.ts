import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    body1: {
      lineHeight: 1.2,
    },
    h1: {
      fontSize: '96px',
      color: 'var(--white)',

      '@media (max-width: 1200)': {
        fontSize: '64px',
      },
    },
    h2: {
      fontSize: '64px',
      color: 'var(--black)',

      '@media (max-width: 1200)': {
        fontSize: '36px',
      },
    },
    h3: {
      fontSize: '48px',
      color: 'var(--black)',

      '@media (max-width: 1200)': {
        fontSize: '32px',
      },
    },
    h4: {
      fontSize: '40px',
      color: 'var(--black)',

      '@media (max-width: 1200)': {
        fontSize: '32px',
      },
    },
    h5: {
      fontSize: '36px',
      color: 'var(--black)',

      '@media (max-width: 1200)': {
        fontSize: '32px',
      },
    },
    h6: {
      fontSize: '32px',
      color: 'var(--black)',
    },
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
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 0 7px 0 var(--blue-violet)',
          background: 'var(--white)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--blue-violet)',
          },
          '&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
        },
        select: {
          paddingLeft: '8px',
        },
        icon: {
          top: 'unset',
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        ol: {
          gap: '9px',
        },
        separator: { marginLeft: 0, marginRight: 0 },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'var(--black)',
          fontWeight: 600,
          textDecoration: 'none',
        },
      },
    },
  },
});
