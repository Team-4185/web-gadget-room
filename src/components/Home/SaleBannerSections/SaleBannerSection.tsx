import { Typography } from '@mui/material';

import { Button } from '@/components';
import { Fire } from '@/assets';

import './SaleBannerSection.css';

type Props = {
  onShopDeals: () => void;
  leftImageSrc?: string;
  rightImageSrc?: string;
  leftImageAlt?: string;
  rightImageAlt?: string;
};

export const SaleBannerSection = ({
  onShopDeals,
  leftImageSrc,
  rightImageSrc,
  leftImageAlt = 'Sale left image',
  rightImageAlt = 'Sale right image',
}: Props) => {
  return (
    <div className="sale-banner">
      {leftImageSrc ? (
        <div className="sale-banner__media sale-banner__media--left">
          <img className="sale-banner__media-image" src={leftImageSrc} alt={leftImageAlt} />
        </div>
      ) : null}

      {rightImageSrc ? (
        <div className="sale-banner__media sale-banner__media--right">
          <img className="sale-banner__media-image" src={rightImageSrc} alt={rightImageAlt} />
        </div>
      ) : null}

      <div className="sale-banner__content">
        <div className="sale-banner__title-row">
          <div className="sale-banner__icon-wrap">
            <Fire className="sale-banner__icon" />
          </div>
          <Typography component="h3" variant="h3" sx={{ lineHeight: 1, color: 'var(--white)' }}>
            Big Summer{' '}
            <Typography
              component="span"
              variant="h3"
              sx={{ fontWeight: 800, color: 'var(--white)' }}
            >
              Sale
            </Typography>
          </Typography>
        </div>

        <Typography
          component="h5"
          variant="h5"
          sx={{ fontStyle: 'italic', lineHeight: 1, color: 'var(--white)' }}
        >
          Up to 50% off on popular models
        </Typography>

        <Button
          maxWidth="200px"
          height="60px"
          fontSize="24px"
          onClick={onShopDeals}
          sx={{ background: 'var(--dark-hero-background)', color: 'var(--white)' }}
        >
          Shop Deals
        </Button>
      </div>
    </div>
  );
};
