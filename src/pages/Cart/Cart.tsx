import { Container, Box, Grid, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { OrderSummary } from '../../components/ui/Cart/OrderSummary';
import TrashIcon from '/icons/trash.svg';
import type { RootState } from '../../core/store';
import greyBox from '/icons/greyBox.png';
import { decreaseAmount, increaseAmount, removeProduct } from '../../core/store/slices/cartSlice';

import './Cart.css';

export const Cart: React.FC = () => {
  const products = useSelector((state: RootState) => state.cart.cart);
  const cartLength = useSelector((state: RootState) => state.cart.cart.length);
  const dispatch = useDispatch();

  return (
    <>
      <Container disableGutters maxWidth="xl" className="cart-container">
        <Box className="cart-content">
          {/* Левая часть */}
          <Box className="cart-left">
            <div className="cart-title">Cart {cartLength ? `(${cartLength})` : null}</div>

            <Box sx={{ width: '100%' }}>
              <Grid container spacing={0} sx={{ width: '100%' }}>
                <Grid size={6}>
                  <span className="cart-grid-header">Product</span>
                </Grid>
                <Grid size={3}>
                  <span className="cart-grid-header">Amount</span>
                </Grid>
                <Grid size={3} sx={{ textAlign: 'end' }}>
                  <span className="cart-grid-header">Subtotal</span>
                </Grid>
              </Grid>

              <Divider sx={{ mt: '8px', mb: '22px' }} />

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
                      <button
                        onClick={() => dispatch(decreaseAmount(product.id))}
                        className="cart-btn"
                      >
                        <RemoveIcon />
                      </button>
                      <span>{product.amount}</span>
                      <button
                        onClick={() => dispatch(increaseAmount(product.id))}
                        className="cart-btn"
                      >
                        <AddIcon />
                      </button>
                    </Box>

                    <Box className="cart-subtotal">€ {product.price}</Box>
                  </Box>
                  <Box
                    onClick={() => dispatch(removeProduct(product.id))}
                    className="cart-product_delete"
                  >
                    <img src={TrashIcon} alt="trash" />
                    <span>Delete</span>
                  </Box>
                  {idx === products.length - 1 ? <Divider sx={{ mt: '22px' }} /> : null}
                </div>
              ))}
            </Box>
          </Box>

          {/* Правая часть */}
          <OrderSummary />
        </Box>
      </Container>
    </>
  );
};
