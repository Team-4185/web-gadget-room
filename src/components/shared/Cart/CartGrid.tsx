import { Box, Grid, Divider } from '@mui/material';
import { useSelector } from 'react-redux';

import { ProductsCart } from '@/components/shared/Cart/ProductsCart';
import type { RootState } from '@/core/store';

export const CartGrid = () => {
  const cartLength = useSelector((state: RootState) => state.cart.cart.length);

  return (
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

        <ProductsCart />
      </Box>
    </Box>
  );
};
