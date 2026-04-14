import type { FC, MouseEvent } from 'react';
import { Typography } from '@mui/material';

import { CartAdd, Like } from '@/assets';
import { useAppDispatch, cartActions } from '@/core/store';

import { Button } from '@/components';
import type { IProduct } from '@/core/types';

import './ProductCard.css';

interface IProps {
  product: IProduct;
  onClick?: () => void;
}

export const ProductCard: FC<IProps> = ({ product, onClick }) => {
  const dispatch = useAppDispatch();

  const addToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(cartActions.addProduct(product.id));
  };

  return (
    <div className="product-card" onClick={onClick}>
      <img
        className="product-card__image"
        width={174}
        height={174}
        src={product.img}
        alt="Product image"
      />
      <Typography sx={{ marginTop: '19px', fontSize: '16px', color: 'var(--black)' }}>
        {product.name}
      </Typography>
      <Typography sx={{ marginTop: '14px', fontSize: 15, fontWeight: 500, color: 'var(--black)' }}>
        € {product.price}
      </Typography>
      <div className="product-card__actions">
        <Button
          maxWidth="188px"
          height="36px"
          fontSize="15px"
          fontWeight={500}
          endIcon={<CartAdd />}
          onClick={addToCart}
        >
          Add to Cart
        </Button>
        <Like className="product-card__like" />
      </div>
    </div>
  );
};
