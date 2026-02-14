import type { FC } from 'react';
import { Typography } from '@mui/material';

import currency from '/icons/currency.svg';

import './ProductTitlePrice.css';

interface IProps {
  name: string;
  price: number;
}

export const ProductTitlePrice: FC<IProps> = ({ name, price }) => {
  return (
    <div className="product-title-price">
      <Typography
        variant="h4"
        component="span"
        style={{
          fontWeight: 700,
        }}
      >
        {name}
      </Typography>
      <div className="product-title-price__amount">
        <Typography
          variant="h6"
          component="span"
          style={{
            fontWeight: 500,
          }}
        >
          € {price}
        </Typography>
      </div>
    </div>
  );
};
