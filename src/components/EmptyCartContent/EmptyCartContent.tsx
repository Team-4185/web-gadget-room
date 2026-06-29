import type { FC } from 'react';
import { Typography } from '@mui/material';

import { Button } from '@/components';

import './EmptyCartContent.css';

type Props = {
  onBackToCatalog: () => void;
};

export const EmptyCartContent: FC<Props> = ({ onBackToCatalog }) => {
  return (
    <div className="empty-cart-content">
      <div className="empty-cart-content__info">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: 'var(--blue-violet)',
          }}
        >
          Oops!
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{
            fontSize: '26px',
            fontWeight: 700,
          }}
        >
          Our little robots got confused
        </Typography>

        <Typography variant="body1" component="p" sx={{ fontWeight: 700 }}>
          They searched everywhere, but your cart has no items.
        </Typography>

        <Button
          onClick={onBackToCatalog}
          maxWidth="190px"
          height="56px"
          fontWeight={500}
          textTransform="uppercase"
          sx={{
            marginTop: '10px',
          }}
        >
          Go to Catalog
        </Button>
      </div>

      <div className="empty-cart-content__image">
        <img
          className="empty-cart-content__image-img"
          src="/emptyCartRobots.png"
          alt="Empty cart illustration"
        />
      </div>
    </div>
  );
};
