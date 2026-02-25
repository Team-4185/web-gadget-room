import { Typography } from '@mui/material';

import { Button } from '@/components';
import { PRODUCTS } from '@/core/constants';

import './PromoGridSection.css';

type PromoContent = {
  productId: number;
  title: { regular: string; bold: string };
  subtitle: string;
  imageSrc: string;
};

type Props = {
  lead: PromoContent;
  leftSmall: PromoContent;
  rightSmall: PromoContent;
  rightBig: PromoContent;
  onBuyNow: () => void;
  onOpenProduct: (product: (typeof PRODUCTS)[0]) => void;
};

export const PromoGridSection = ({
  lead,
  leftSmall,
  rightSmall,
  rightBig,
  onBuyNow,
  onOpenProduct,
}: Props) => {
  const getProductById = (id: number) =>
    PRODUCTS.find((product) => product.id === id) ?? PRODUCTS[0];

  return (
    <section className="promo-grid" aria-label="Promotions">
      <div className="promo-grid__left">
        <div className="promo-grid__lead-card">
          <div className="promo-grid__lead-content">
            <Typography
              variant="h6"
              sx={{
                fontStyle: 'italic',
                fontWeight: 300,
                lineHeight: 1,
                display: 'inline-block',
              }}
            >
              New{' '}
              <Typography
                component="span"
                variant="h6"
                sx={{
                  fontWeight: 600,
                  display: 'inline-block',
                  fontSize: 'inherit',
                  fontStyle: 'normal',
                  lineHeight: 'inherit',
                  letterSpacing: 'inherit',
                }}
              >
                Colors
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontStyle: 'italic',
                fontWeight: 300,
                lineHeight: 1,
                display: 'inline-block',
              }}
            >
              New{' '}
              <Typography
                component="span"
                variant="h6"
                sx={{
                  fontWeight: 600,
                  display: 'inline-block',
                  fontSize: 'inherit',
                  fontStyle: 'normal',
                  lineHeight: 'inherit',
                  letterSpacing: 'inherit',
                }}
              >
                Features
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 300,
                fontSize: '15px',
                lineHeight: '166.67%',
                marginTop: '20px',
              }}
            >
              {lead.subtitle}
            </Typography>
            <Button
              maxWidth="170px"
              height="50px"
              fontSize="20px"
              onClick={onBuyNow}
              sx={{ marginTop: '48px' }}
            >
              Buy Now
            </Button>
          </div>
          <div className="promo-grid__lead-media">
            <img
              className="promo-grid__lead-image"
              src={lead.imageSrc}
              alt={`${lead.title.regular} image`}
            />
          </div>
        </div>

        <div className="promo-grid__bottom-row">
          <div className="promo-grid__small-card">
            <div className="promo-grid__small-card-content promo-grid__small-card-content--left">
              <Typography
                variant="body1"
                sx={{
                  fontSize: '24px',
                  lineHeight: '91.667%',
                  letterSpacing: '-1.44px',
                  color: 'var(--black)',
                  display: 'inline-block',
                }}
              >
                {leftSmall.title.regular}{' '}
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 600,
                    display: 'inline-block',
                    fontSize: 'inherit',
                    fontStyle: 'normal',
                    lineHeight: 'inherit',
                    letterSpacing: 'inherit',
                  }}
                >
                  {leftSmall.title.bold}
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '14px',
                  lineHeight: '142.857%',
                  color: 'var(--black)',
                  marginTop: '15px',
                }}
              >
                {leftSmall.subtitle}
              </Typography>
              <Button
                maxWidth="150px"
                height="40px"
                fontSize="16px"
                onClick={() => onOpenProduct(getProductById(leftSmall.productId))}
                sx={{ marginTop: '25px' }}
              >
                View
              </Button>
            </div>
            <div className="promo-grid__small-media promo-grid__small-media--left">
              <img
                className="promo-grid__small-image"
                src={leftSmall.imageSrc}
                alt={`${leftSmall.title.regular} image`}
              />
            </div>
          </div>

          <div className="promo-grid__small-card">
            <div className="promo-grid__small-card-content promo-grid__small-card-content--right">
              <Typography
                variant="body1"
                sx={{
                  fontSize: '24px',
                  lineHeight: '91.667%',
                  letterSpacing: '-1.44px',
                  color: 'var(--black)',
                  display: 'inline-block',
                }}
              >
                {rightSmall.title.regular}{' '}
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 600,
                    display: 'inline-block',
                    fontSize: 'inherit',
                    fontStyle: 'normal',
                    lineHeight: 'inherit',
                    letterSpacing: 'inherit',
                  }}
                >
                  {rightSmall.title.bold}
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '125%',
                  color: 'var(--black)',
                  marginTop: '15px',
                }}
              >
                {rightSmall.subtitle}
              </Typography>
              <Button
                maxWidth="63px"
                height="32px"
                fontSize="14px"
                onClick={() => onOpenProduct(getProductById(rightSmall.productId))}
                sx={{ marginTop: '11px' }}
              >
                View
              </Button>
            </div>
            <div className="promo-grid__small-media promo-grid__small-media--right">
              <img
                className="promo-grid__small-image"
                src={rightSmall.imageSrc}
                alt={`${rightSmall.title.regular} image`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="promo-grid__right">
        <div className="promo-grid__right-content">
          <Typography
            variant="h2"
            sx={{
              display: 'inline-block',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-2px',
              color: 'var(--white)',
            }}
          >
            {rightBig.title.regular}{' '}
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
                display: 'inline-block',
                fontSize: 'inherit',
                fontStyle: 'normal',
                lineHeight: 'inherit',
                letterSpacing: 'inherit',
              }}
            >
              {rightBig.title.bold}
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: 'inline-block',
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '154.167%',
              color: 'var(--white)',
            }}
          >
            {rightBig.subtitle}
          </Typography>
          <div className="promo-grid__right-media">
            <img
              className="promo-grid__right-image"
              src={rightBig.imageSrc}
              alt={`${rightBig.title.regular} image`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
