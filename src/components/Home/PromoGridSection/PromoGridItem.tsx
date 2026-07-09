import { Typography } from '@mui/material';

import { Button } from '@/components';
import type { IProduct } from '@/core/types';

export type PromoContent = {
  productId: number;
  title: { regular: string; bold: string };
  subtitle: string;
  imageSrc: string;
};

type PromoGridItemProps = {
  item: PromoContent;
  variant: 'lead' | 'small-left' | 'small-right' | 'right-big';
  onBuyNow?: (productId: number) => void;
  onOpenProduct?: (productId: number) => void;
  getProductById?: (id: number) => IProduct;
};

const BoldTitlePart = ({ children }: { children: string }) => (
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
    {children}
  </Typography>
);

const LeadPromoItem = ({ item, onBuyNow }: Pick<PromoGridItemProps, 'item' | 'onBuyNow'>) => (
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
        New <BoldTitlePart>Colors</BoldTitlePart>
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
        New <BoldTitlePart>Features</BoldTitlePart>
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
        {item.subtitle}
      </Typography>
      <Button
        maxWidth="170px"
        height="50px"
        fontSize="20px"
        onClick={() => onBuyNow?.(item.productId)}
        sx={{ marginTop: '48px' }}
      >
        Buy Now
      </Button>
    </div>
    <div className="promo-grid__lead-media">
      <img
        className="promo-grid__lead-image"
        src={item.imageSrc}
        alt={`${item.title.regular} image`}
      />
    </div>
  </div>
);

const SmallPromoItem = ({
  item,
  variant,
  onOpenProduct,
}: Pick<PromoGridItemProps, 'item' | 'variant' | 'onOpenProduct'>) => {
  const isLeft = variant === 'small-left';

  return (
    <div className="promo-grid__small-card">
      <div
        className={`promo-grid__small-card-content promo-grid__small-card-content--${
          isLeft ? 'left' : 'right'
        }`}
      >
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
          {item.title.regular} <BoldTitlePart>{item.title.bold}</BoldTitlePart>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: isLeft ? undefined : 400,
            fontSize: isLeft ? '14px' : '12px',
            lineHeight: isLeft ? '142.857%' : '125%',
            color: 'var(--black)',
            marginTop: '15px',
          }}
        >
          {item.subtitle}
        </Typography>
        <Button
          maxWidth={isLeft ? '150px' : '63px'}
          height={isLeft ? '40px' : '32px'}
          fontSize={isLeft ? '16px' : '14px'}
          onClick={() => onOpenProduct?.(item.productId)}
          sx={{ marginTop: isLeft ? '25px' : '11px' }}
        >
          View
        </Button>
      </div>
      <div
        className={`promo-grid__small-media promo-grid__small-media--${isLeft ? 'left' : 'right'}`}
      >
        <img
          className="promo-grid__small-image"
          src={item.imageSrc}
          alt={`${item.title.regular} image`}
        />
      </div>
    </div>
  );
};

const RightBigPromoItem = ({ item }: Pick<PromoGridItemProps, 'item'>) => (
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
      {item.title.regular} <BoldTitlePart>{item.title.bold}</BoldTitlePart>
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
      {item.subtitle}
    </Typography>
    <div className="promo-grid__right-media">
      <img
        className="promo-grid__right-image"
        src={item.imageSrc}
        alt={`${item.title.regular} image`}
      />
    </div>
  </div>
);

export const PromoGridItem = ({ item, variant, onBuyNow, onOpenProduct }: PromoGridItemProps) => {
  if (variant === 'lead') {
    return <LeadPromoItem item={item} onBuyNow={onBuyNow} />;
  }

  if (variant === 'right-big') {
    return <RightBigPromoItem item={item} />;
  }

  return <SmallPromoItem item={item} variant={variant} onOpenProduct={onOpenProduct} />;
};
