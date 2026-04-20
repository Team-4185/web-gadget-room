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
    aboutHeading: {
      fontSize: '48px',
      lineHeight: '56px',
      fontWeight: 700,
      letterSpacing: '-2px',
    },
    aboutSectionHeading: {
      fontSize: '24px',
      lineHeight: '20px',
      fontWeight: 600,
      letterSpacing: '-2px',
      textTransform: 'uppercase',
      color: 'var(--grey-violet)',
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
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          aboutHeading: 'h2',
          aboutSectionHeading: 'p',
        },
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
      variants: [
        {
          props: { 'data-style-variant': 'subtleBorder' } as never,
          style: {
            boxShadow: 'var(--inputs-box-shadow)',
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid var(--blue-violet)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: '1px solid var(--blue-violet)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '1px solid var(--blue-violet)',
            },
            '&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline': {
              border: '1px solid var(--blue-violet)',
            },
          },
        },
      ],
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
        root: {
          padding: '18px 0',
        },
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
    MuiStep: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        iconContainer: {
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50px',
          border: '1px solid var(--blue-violet)',
          '&.Mui-active': {
            background: 'var(--blue-violet)',
            border: 'none',
          },
          '&.Mui-active p': {
            color: 'var(--white)',
          },
        },
      },
    },
    MuiStepButton: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
        },
      },
    },
  },
});
