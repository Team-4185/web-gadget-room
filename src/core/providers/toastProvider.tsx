import type { FC, PropsWithChildren } from 'react';
import { styled } from '@mui/material';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';

import { CheckCircleOutlineIcon, InfoCircleOutlineIcon } from '@/assets';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent': {
    padding: '8px',
    borderRadius: '10px',

    '& #notistack-snackbar': {
      padding: 0,
      gap: '8px',
      fontSize: '16px',
    },
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: 'var(--chateau-green)',
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: 'var(--red)',
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: 'var(--amber-opacity-89)',
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: 'var(--blue)',
  },
}));

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SnackbarProvider
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
      }}
      iconVariant={{
        success: <CheckCircleOutlineIcon />,
        error: <InfoCircleOutlineIcon />,
        warning: <InfoCircleOutlineIcon />,
        info: <InfoCircleOutlineIcon />,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};
