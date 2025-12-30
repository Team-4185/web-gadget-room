import type { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';

export const AuthPanel: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ position: 'relative', width: '50%', zIndex: 1 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 40px',
          minHeight: '800px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
