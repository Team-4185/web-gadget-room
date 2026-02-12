import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { CartAdd, Like } from '@/assets';
import { addProduct } from '@/core/store/slices/cartSlice.ts';
import {
  addProductToWishList,
  removeProductFromWishList,
} from '@/core/store/slices/wishListSlice.ts';
import type { RootState } from '@/core/store';
import { Button } from '@/components';
import type { IProduct } from '@/core/types';

import './ProductCard.css';

interface IProps {
  product: IProduct;
  onClick?: () => void;
}

export const ProductCard: FC<IProps> = ({ product, onClick }) => {
  // const wishList = useSelector((state: RootState) => state.wishList.wishList);
  // const dispatch = useDispatch();
  // const addToCart = () => dispatch(addProduct({ id, name, price, amount: 1 }));

  // const toogleWishList = () => {
  //   if (wishList.some((item) => item.id === id)) {
  //     dispatch(removeProductFromWishList(id));
  //   } else {
  //     dispatch(addProductToWishList({ id, name, price, amount: 1 }));
  //   }
  // };

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
        >
          Add to Cart
        </Button>
        <Like className="product-card__like" />
      </div>
    </div>
  );
};
