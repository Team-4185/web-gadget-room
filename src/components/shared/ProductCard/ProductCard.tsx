import type { FC } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import GraySquare from '/icons/GraySquare.svg';
import Currency from '/icons/currency.svg';
import WhishlistIcon from '/icons/WhishlistIcon.svg';
import WishListWhole from '/icons/wishListWhole.svg';
import Cart from '/icons/AddToCart.svg';
import { addProduct } from '@/core/store/slices/cartSlice.ts';
import {
  addProductToWishList,
  removeProductFromWishList,
} from '@/core/store/slices/wishListSlice.ts';
import type { RootState } from '@/core/store';

type ProductCardProps = {
  id: number;
  image: string;
  name: string;
  price: number;
  sale: number | boolean | undefined;
  hit: boolean | undefined;
  newProduct: boolean | undefined;
  onClick?: () => void;
  home?: boolean;
};

export const ProductCard: FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  sale,
  hit,
  newProduct,
  home,
  onClick,
}) => {
  const wishList = useSelector((state: RootState) => state.wishList.wishList);
  const dispatch = useDispatch();
  const addToCart = () => dispatch(addProduct({ id, name, price, amount: 1 }));

  const toogleWishList = () => {
    if (wishList.some((item) => item.id === id)) {
      dispatch(removeProductFromWishList(id));
    } else {
      dispatch(addProductToWishList({ id, name, price, amount: 1 }));
    }
  };
  return (
    <Box className={home ? 'product-card-home' : 'product-card'} onClick={onClick}>
      {sale || hit || newProduct ? (
        <span
          style={{
            borderRadius: '6px',
            padding: '8px',
            background: '#fff',
            position: 'absolute',
            top: '40px',
            left: '30px',
            fontWeight: '500',
            fontSize: '15px',
            color: '#000',
          }}
        >
          {sale ? 'Sale' : hit ? 'Hit' : newProduct ? 'New' : null}
        </span>
      ) : null}
      <img
        className={home ? 'product-card__image-home' : 'product-card__image'}
        src={image ? image : GraySquare}
        alt="Product image"
      />

      <Box className="product-card__info">
        <span className={home ? 'product-card__name-home' : 'product-card__name'}>{name}</span>
        <Box className={home ? 'product-card__price-home' : 'product-card__price'}>
          <img src={Currency} alt="currency icon" />
          <span>{price}</span>
        </Box>
        <Box className={home ? 'product-card__actions-home' : 'product-card__actions'}>
          <Box
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
            className="product-card__add-to-cart"
          >
            <span className="product-card__add-to-cart-text">Add to Cart</span>
            <img src={Cart} alt="Cart icon" />
          </Box>
          <img
            className={home ? 'product-card__wishlist-home' : 'product-card__wishlist'}
            src={wishList.some((item) => item.id === id) ? WishListWhole : WhishlistIcon}
            alt="whishlist icon"
            onClick={(e) => {
              e.stopPropagation();
              toogleWishList();
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
