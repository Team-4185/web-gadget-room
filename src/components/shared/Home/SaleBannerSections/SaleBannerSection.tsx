import { Button } from '@/components';
import { Box, Typography } from '@mui/material';

import fire from '/icons/fire.svg';

const sectionSx = {
  width: '100%',
  margin: '0 auto',
  background: '#aeaeae',
  padding: '96px 423px',
  display: 'flex',
  justifyContent: 'center',
};

const contentSx = {
  display: 'flex',
  flexDirection: 'column',
  width: '594px',
  height: 'max-content',
  gap: '30px',
};

const titleRowSx = {
  display: 'flex',
  gap: '42px',
  alignSelf: 'center',
  alignItems: 'center',
};

const headingSx = {
  fontWeight: 400,
  fontSize: '48px',
  lineHeight: '100%',
  color: 'var(--black)',
};

const subtitleSx = {
  fontStyle: 'italic',
  fontWeight: 400,
  fontSize: '36px',
  color: 'var(--black)',
  lineHeight: '100%',
};

const buttonSx = {
  alignSelf: 'center',
  borderRadius: '15px',
  boxShadow: '1px 10px 30px 0 rgba(0, 0, 0, 0.25)',
  background: 'var(--white)',
  lineHeight: '100%',
};

const inlineBoldTextSx = {
  fontWeight: 800,
  fontSize: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
  fontStyle: 'inherit',
  color: 'inherit',
};

type Props = {
  onShopDeals: () => void;
};

export const SaleBannerSection = ({ onShopDeals }: Props) => {
  return (
    <Box sx={sectionSx}>
      <Box sx={contentSx}>
        <Box sx={titleRowSx}>
          <Box component="img" src={fire} alt="fire icon" />
          <Typography component="h4" variant="h4" sx={headingSx}>
            Big Summer{' '}
            <Typography component="span" variant="h4" sx={inlineBoldTextSx}>
              Sale
            </Typography>
          </Typography>
        </Box>

        <Typography component="h5" variant="h5" sx={subtitleSx}>
          Up to 50% off on popular models
        </Typography>

        <Button
          maxWidth="200px"
          height="60px"
          fontSize="24px"
          fontWeight={600}
          border="none"
          onClick={onShopDeals}
          sx={buttonSx}
        >
          Shop Deals
        </Button>
      </Box>
    </Box>
  );
};
