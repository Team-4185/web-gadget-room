import { Button } from '@/components';
import { Box, Typography } from '@mui/material';

import { Fire } from '@/assets';

const sectionSx = {
  width: '100%',
  background: 'var(--light-gray)',
  padding: '96px 423px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const contentSx = {
  display: 'flex',
  flexDirection: 'column',
  width: '594px',
  maxHeight: '209px',
  gap: '30px',
  alignItems: 'center',
  justifyContent: 'center',
};

const titleRowSx = {
  display: 'flex',
  gap: '20px',
};

type Props = {
  onShopDeals: () => void;
};

export const SaleBannerSection = ({ onShopDeals }: Props) => {
  return (
    <Box sx={sectionSx}>
      <Box sx={contentSx}>
        <Box sx={titleRowSx}>
          <Box
            sx={{
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Fire style={{ fill: 'var(--icon-fire)' }} />
          </Box>
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
        </Box>

        <Typography
          component="h5"
          variant="h5"
          sx={{
            fontStyle: 'italic',
            lineHeight: 1,
            color: 'var(--white)',
          }}
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
      </Box>
    </Box>
  );
};
