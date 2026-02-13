import { Box, Grid, Typography } from '@mui/material';

import { Button } from '@/components';
import { PRODUCTS } from '@/core/constants';

const promoLeadTextSx = {
  fontStyle: 'italic',
  fontWeight: 300,
  lineHeight: 1,
  display: 'inline-block',
};

const promoCardTitleSx = {
  fontSize: '24px',
  lineHeight: '91.667%',
  letterSpacing: '-1.44px',
  color: 'var(--black)',
  display: 'inline-block',
};

const inlineBoldTextSx = {
  fontWeight: 600,
  display: 'inline-block',
  fontSize: 'inherit',
  fontStyle: 'normal',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
};

const smallCardContainerSx = {
  width: '100%',
  height: '272px',
  background: 'var(--white)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: '23px',
  paddingTop: '42px',
  paddingBottom: '51px',
};

const smallCardContentSx = {
  width: '193px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',
};

const smallCardImageSx = {
  background: 'var(--white)',
  width: '50%',
  height: '100%',
  objectFit: 'cover',
  marginLeft: 'auto',
};

type Props = {
  title: { regular: string; bold: string };
  subtitle: string;
  onBuyNow: () => void;
  onOpenProduct: (product: (typeof PRODUCTS)[0]) => void;
};

export const PromoGridSection = ({ onBuyNow, onOpenProduct }: Props) => {
  return (
    <Grid container sx={{ width: '100%', height: '584px' }}>
      <Grid size={6} container direction="column">
        <Grid size={12}>
          <Box
            sx={{
              width: '100%',
              height: '314px',
              background: 'var(--light-gray)',
              display: 'grid',
              gridTemplateColumns: '360px 1fr',
              alignItems: 'center',
              columnGap: '15px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                padding: '36px 0 47px 23px',
              }}
            >
              <Typography variant="h6" sx={promoLeadTextSx}>
                New{' '}
                <Typography component="span" variant="h6" sx={inlineBoldTextSx}>
                  Colors.
                </Typography>
              </Typography>
              <Typography variant="h6" sx={{ ...promoLeadTextSx, marginTop: '7px' }}>
                New{' '}
                <Typography component="span" variant="h6" sx={inlineBoldTextSx}>
                  Features.
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 300,
                  fontSize: '15px',
                  lineHeight: '166.67%',
                  color: 'var(--white)',
                  marginTop: '20px',
                }}
              >
                An incredible camera, a titanium body and the most powerful A19 Pro chip.
              </Typography>
              <Button
                maxWidth="170px"
                height="50px"
                fontSize="20px"
                onClick={onBuyNow}
                sx={{ marginTop: '25px' }}
              >
                Buy Now
              </Button>
            </Box>
            <Box
              component="img"
              src={PRODUCTS[0].img}
              sx={{
                justifySelf: 'end',
                alignSelf: 'end',
                height: '100%',
                width: 'auto',
                objectFit: 'contain',
              }}
              alt="Promo image"
            />
          </Box>
        </Grid>
        <Grid container size={12}>
          <Grid size={6}>
            <Box sx={smallCardContainerSx}>
              <Box sx={smallCardContentSx}>
                <Typography variant="body1" sx={promoCardTitleSx}>
                  Xiaomi 15{' '}
                  <Typography component="span" sx={inlineBoldTextSx}>
                    Pro
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
                  Leica camera, 120W fast charging and premium design at an affordable price.
                </Typography>
                <Button
                  maxWidth="150px"
                  height="40px"
                  fontSize="16px"
                  onClick={() => onOpenProduct(PRODUCTS[0])}
                  sx={{ marginTop: '25px' }}
                >
                  View
                </Button>
              </Box>
              <Box component="img" sx={smallCardImageSx} src={PRODUCTS[0].img} alt="Promo image" />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box sx={smallCardContainerSx}>
              <Box sx={smallCardContentSx}>
                <Typography variant="body1" sx={promoCardTitleSx}>
                  Google Pixel 10{' '}
                  <Typography component="span" sx={inlineBoldTextSx}>
                    Pro
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
                  Pure Android, the best AI from Google, and a camera that works magic at night.
                </Typography>
                <Button
                  maxWidth="63px"
                  height="32px"
                  fontSize="14px"
                  onClick={() => onOpenProduct(PRODUCTS[1])}
                  sx={{ marginTop: '11px' }}
                >
                  View
                </Button>
              </Box>
              <Box component="img" sx={smallCardImageSx} src={PRODUCTS[1].img} alt="Promo image" />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={6}>
        <Box
          sx={{
            width: '100%',
            background: 'var(--black)',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: '29px',
            paddingLeft: '65px',
            paddingTop: '63px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              maxWidth: '438px',
              flexDirection: 'column',
            }}
          >
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
              iPhone 17{' '}
              <Typography component="span" sx={inlineBoldTextSx}>
                Pro
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
              The new iPhone 17 arrives in colors that capture every side of you.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
