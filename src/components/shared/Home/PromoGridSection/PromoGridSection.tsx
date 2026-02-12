import { Box, Grid, Typography } from '@mui/material';
import { Button } from '@/components';
import { PRODUCTS } from '@/core/constants';

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
              background: '#797979',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
              paddingLeft: '23px',
              paddingTop: '39px',
              paddingBottom: '50px',
            }}
          >
            <Box
              sx={{
                width: '322px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'left',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontStyle: 'italic',
                  fontWeight: '300',
                  fontSize: '32px',
                  lineHeight: '140.625%',
                  color: '#fff',
                }}
              >
                New <span style={{ fontWeight: '600' }}>Colors.</span>
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontStyle: 'italic',
                  fontWeight: '300',
                  fontSize: '32px',
                  lineHeight: '140.625%',
                  color: '#fff',
                }}
              >
                New <span style={{ fontWeight: '600' }}>Features.</span>
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '300',
                  fontSize: '15px',
                  lineHeight: '166.67%',
                  color: '#fff',
                  marginTop: '25px',
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
            <img
              style={{
                background: '#fff',
                width: '50%',
                height: '100%',
                objectFit: 'cover',
                marginLeft: 'auto',
              }}
              alt="Promo image"
            />
          </Box>
        </Grid>
        <Grid container size={12}>
          <Grid size={6}>
            <Box
              sx={{
                width: '100%',
                height: '272px',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                paddingLeft: '23px',
                paddingTop: '42px',
                paddingBottom: '51px',
              }}
            >
              <Box
                sx={{
                  width: '193px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'left',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '400',
                    fontSize: '24px',
                    lineHeight: '91.667%',
                    letterSpacing: '-1.44px',
                    color: '#000',
                  }}
                >
                  Xiaomi 15 <span style={{ fontWeight: '600' }}>Pro</span>
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '300',
                    fontSize: '15px',
                    lineHeight: '142.857%',
                    color: '#000',
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
              <img
                style={{
                  background: '#fff',
                  width: 'auto',
                  height: '100%',
                  objectFit: 'cover',
                  marginLeft: 'auto',
                }}
                src={PRODUCTS[0].img}
                alt="Promo image"
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box
              sx={{
                width: '100%',
                height: '272px',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                paddingLeft: '23px',
                paddingTop: '42px',
                paddingBottom: '51px',
              }}
            >
              <Box
                sx={{
                  width: '193px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'left',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '400',
                    fontSize: '24px',
                    lineHeight: '91.667%',
                    letterSpacing: '-1.44px',
                    color: '#000',
                  }}
                >
                  Google Pixel 10 <span style={{ fontWeight: '600' }}>Pro</span>
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '300',
                    fontSize: '12px',
                    lineHeight: '125%',
                    color: '#000',
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
              <img
                style={{
                  background: '#fff',
                  width: 'auto',
                  height: '100%',
                  objectFit: 'cover',
                  marginLeft: 'auto',
                }}
                src={PRODUCTS[1].img}
                alt="Promo image"
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={6}>
        <Box
          sx={{
            width: '100%',
            background: '#717171',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'left',
            flexDirection: 'column',
            gap: '29px',
            paddingLeft: '65px',
            paddingTop: '63px',
          }}
        >
          <Typography
            sx={{
              display: 'block',
              fontFamily: 'Montserrat, sans-serif',
              fontStyle: 'italic',
              fontWeight: '300',
              fontSize: '36px',
              lineHeight: 1,
              letterSpacing: '-0.06em',
              color: '#fff',
            }}
          >
            Samsung
            <span style={{ fontWeight: '600', display: 'inline-block', lineHeight: 1 }}>
              Galaxy S24 Ultra
            </span>
          </Typography>
          <Typography
            sx={{
              display: 'block',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '400',
              fontSize: '24px',
              lineHeight: 1,
              color: '#fff',
            }}
          >
            Shi-Revolution in your pocket.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
