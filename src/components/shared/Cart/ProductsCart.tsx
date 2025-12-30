import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import greyBox from '/icons/greyBox.png';
import TrashIcon from '/icons/trash.svg';

import type { RootState } from '../../../core/store';
import {
  decreaseAmount,
  increaseAmount,
  removeProduct,
} from '../../../core/store/slices/cartSlice';

export const ProductsCart = () => {
  const products = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <>
      {products.map((product, idx) => (
        <div key={product.id}>
          {idx === 0 ? null : <Divider sx={{ mt: '22px', mb: '20px' }} />}
          <Box className="cart-product">
            <Box>
              <img className="cart-product-img" src={greyBox} alt={product.name} />
            </Box>
            <Box className="cart-product-info">
              <span className="cart-product-name">{product.name}</span>
              <span className="cart-product-color">Black</span>
            </Box>

            <Box className="cart-amount-box">
              <button onClick={() => dispatch(decreaseAmount(product.id))} className="cart-btn">
                <RemoveIcon />
              </button>
              <span>{product.amount}</span>
              <button onClick={() => dispatch(increaseAmount(product.id))} className="cart-btn">
                <AddIcon />
              </button>
            </Box>

            <Box className="cart-subtotal">€ {product.price}</Box>
          </Box>
          <Box onClick={() => dispatch(removeProduct(product.id))} className="cart-product_delete">
            <img src={TrashIcon} alt="trash" />
            <span>Delete</span>
          </Box>
          {idx === products.length - 1 ? <Divider sx={{ mt: '22px' }} /> : null}
        </div>
      ))}
    </>
  );
};
