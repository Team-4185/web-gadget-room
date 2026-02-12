import { Box, Grid, Typography } from '@mui/material';
import { Button } from '@/components';

type Props = {
  title: { regular: string; bold: string };
  subtitle: string;
  onBuyNow: () => void;
};

export const PromoGridSection = ({ title, subtitle, onBuyNow }: Props) => {
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
                style={{
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
                style={{
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
                style={{
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
                style={{ marginTop: '25px' }}
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
                justifyContent: 'center',
              }}
            >
              {' '}
            </Box>
          </Grid>
          <Grid size={6}>
            <Box
              sx={{
                width: '100%',
                height: '272px',
                background: '#aeaeae',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {' '}
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
            style={{
              display: 'block',
              fontFamily: 'Montserrat, sans-serif',
              fontStyle: 'italic',
              fontWeight: '300',
              fontSize: '36px',
              lineHeight: '131%',
              letterSpacing: '-0.06em',
              color: '#fff',
            }}
          >
            Samsung <span style={{ fontWeight: '600' }}>Galaxy S24 Ultra</span>
          </Typography>
          <Typography
            style={{
              display: 'block',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '400',
              fontSize: '24px',
              lineHeight: '196%',
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
