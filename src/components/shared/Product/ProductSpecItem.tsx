import type { FC } from 'react';
import { Box } from '@mui/material';

interface IProps {
  label: string;
  value: string;
  icon: string;
  alt: string;
}

export const ProductSpecItem: FC<IProps> = ({ label, value, icon, alt }) => {
  return (
    <Box
      sx={{
        borderRadius: '7px',
        padding: '16px',
        width: '100%',
        background: '#f4f4f4',
        display: 'flex',
        gap: '8px',
      }}
    >
      <img style={{ width: '24px', height: '24px' }} src={icon} alt={alt} />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '114%',
            color: '#a7a7a7',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '114%',
            color: '#4e4e4e',
          }}
        >
          {value}
        </span>
      </Box>
    </Box>
  );
};
