import type { FC } from 'react';
import { Box } from '@mui/material';

interface IProps {
  label: string;
  value: string;
  icon: string;
  alt: string;
}

export const ProductMetaItem: FC<IProps> = ({ label, value, icon, alt }) => {
  return (
    <Box sx={{ display: 'flex', width: '157px', gap: '16px', alignItems: 'center' }}>
      <div
        style={{
          borderRadius: '11px',
          padding: '16px',
          width: '56px',
          height: '56px',
          background: '#f6f6f6',
        }}
      >
        <img src={icon} alt={alt} />
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <span
          style={{
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '171%',
            color: '#717171',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '171%',
            color: '#000',
          }}
        >
          {value}
        </span>
      </Box>
    </Box>
  );
};
