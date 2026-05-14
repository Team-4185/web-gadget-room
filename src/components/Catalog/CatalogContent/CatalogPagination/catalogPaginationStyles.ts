import type { SxProps, Theme } from '@mui/material/styles';

export const catalogPaginationStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '60px',
  height: '36px',

  '& .MuiPagination-ul': {
    borderRadius: '10px',
    boxShadow: '0 0 7px 0 var(--blue-violet)',
    background: 'var(--white)',
  },

  '& .MuiPaginationItem-root:not(.MuiPaginationItem-previousNext)': {
    width: '26px',
    height: '26px',
    minWidth: '26px',
    fontWeight: 600,
    fontSize: '16px',
    padding: 0,
    margin: 0,
  },
  '& .MuiPaginationItem-root.Mui-selected': {
    background: 'var(--blue-violet)',
    color: 'var(--white)',
  },
  '& .MuiPaginationItem-root:not(.Mui-selected):not(.MuiPaginationItem-previousNext)': {
    border: '1px solid var(--blue-violet)',
    color: 'var(--black)',
  },
  '& .MuiPaginationItem-previousNext': {
    height: '36px',
    padding: 0,
    margin: 0,
    boxShadow: '0 0 7px 0 var(--blue-violet)',
    background: 'var(--white)',
    borderRadius: '10px',
  },
  '& .MuiPagination-ul > :first-of-type .MuiPaginationItem-previousNext': {
    width: '26px',
    minWidth: '26px',
  },
  '& .MuiPagination-ul > :last-of-type .MuiPaginationItem-previousNext': {
    width: '73px',
    minWidth: '73px',
  },
  '& .MuiPagination-ul > :first-of-type': {
    marginRight: '13px',
  },
  '& .MuiPagination-ul > :last-of-type': {
    marginLeft: '13px',
  },
  '& .MuiPagination-ul > :not(:first-of-type):not(:nth-last-of-type(2)):not(:last-of-type)': {
    marginRight: '17px',
  },
  '& [data-pagination="next"] , & [data-pagination="prev"]': {
    display: 'flex',
    alignItems: 'center',
  },
  '& [data-pagination="next"] p': {
    fontWeight: 600,
    fontSize: '16px',
    color: 'var(--black)',
  },
};
