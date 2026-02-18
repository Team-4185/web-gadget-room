import { Typography } from '@mui/material';

import { Button } from '@/components';
import { Fire } from '@/assets';

import './SaleBannerSection.css';

type Props = {
  onShopDeals: () => void;
};

export const SaleBannerSection = ({ onShopDeals }: Props) => {
  return (
    <section className="sale-banner">
      <div className="sale-banner__content">
        <div className="sale-banner__title-row">
          <div className="sale-banner__icon-wrap">
            <Fire className="sale-banner__icon" />
          </div>
          <Typography component="h3" variant="h3" style={{ lineHeight: 1, color: 'var(--white)' }}>
            Big Summer{' '}
            <Typography
              component="span"
              variant="h3"
              style={{ fontWeight: 800, color: 'var(--white)' }}
            >
              Sale
            </Typography>
          </Typography>
        </div>

        <Typography
          component="h5"
          variant="h5"
          style={{ fontStyle: 'italic', lineHeight: 1, color: 'var(--white)' }}
        >
          Up to 50% off on popular models
        </Typography>

        <Button
          maxWidth="200px"
          height="60px"
          fontSize="24px"
          onClick={onShopDeals}
          sx={{ background: 'var(--dark-button-background)', color: 'var(--white)' }}
        >
          Shop Deals
        </Button>
      </div>
    </section>
  );
};
