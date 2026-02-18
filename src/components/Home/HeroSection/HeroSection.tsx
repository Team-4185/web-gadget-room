import { Typography } from '@mui/material';

import { Button } from '@/components';

import './HeroSection.css';

type Props = {
  title: { regular: string; bold: string };
  subtitle: string;
  onBuyNow: () => void;
  imageSrc?: string;
  imageAlt?: string;
};

export const HeroSection = ({
  title,
  subtitle,
  onBuyNow,
  imageSrc,
  imageAlt = 'Hero product image',
}: Props) => {
  return (
    <section className="home-hero">
      <div className="home-hero__content">
        <Typography
          variant="h1"
          component="h1"
          style={{
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: '75%',
            letterSpacing: '-0.05em',
          }}
        >
          {title.regular}{' '}
          <Typography
            variant="h1"
            component="span"
            style={{
              lineHeight: '75%',
              letterSpacing: '-0.05em',
              display: 'inline-block',
              fontWeight: 600,
            }}
          >
            {title.bold}
          </Typography>
        </Typography>

        <Typography
          variant="body1"
          component="p"
          style={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '120%',
            color: 'var(--white)',
          }}
        >
          {subtitle}
        </Typography>

        <Button
          maxWidth="200px"
          height="60px"
          fontSize="20px"
          onClick={onBuyNow}
          sx={{ background: 'var(--dark-button-background)', color: 'var(--white)' }}
        >
          Buy Now
        </Button>
      </div>

      {imageSrc ? (
        <div className="home-hero__media">
          <img className="home-hero__media-image" src={imageSrc} alt={imageAlt} />
        </div>
      ) : null}
    </section>
  );
};
