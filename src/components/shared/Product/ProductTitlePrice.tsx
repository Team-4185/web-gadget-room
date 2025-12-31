import type { FC } from 'react';
import { Box } from '@mui/material';

import currency from '/icons/currency.svg';

interface IProps {
  name: string;
  price: number;
}

export const ProductTitlePrice: FC<IProps> = ({ name, price }) => {
  return (
    <>
      <span style={{ fontWeight: '700', fontSize: '40px', color: '#000' }}>{name}</span>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          style={{ marginRight: '14px', width: '32px', height: '32px' }}
          src={currency}
          alt="currency icon"
        />
        <span style={{ fontWeight: '500', fontSize: '32px', color: '#000' }}>{price}</span>
      </Box>
    </>
  );
};
