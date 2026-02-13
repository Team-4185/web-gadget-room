import { Button } from '@/components';
import { Box, Typography } from '@mui/material';

type Props = {
  title: { regular: string; bold: string };
  subtitle: string;
  onBuyNow: () => void;
};

export const HeroSection = ({ title, subtitle, onBuyNow }: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '600px',
        background: 'var(--light-gray)',
        paddingLeft: '81px',
        paddingRight: '758px',
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'left',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '35px',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
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
            sx={{
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
          sx={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '120%',
            color: 'var(--white)',
          }}
        >
          {subtitle}
        </Typography>

        <Button maxWidth="200px" height="60px" fontSize="20px" onClick={onBuyNow}>
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};
