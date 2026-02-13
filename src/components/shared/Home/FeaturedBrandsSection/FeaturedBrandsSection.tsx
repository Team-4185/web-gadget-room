import { Box, Typography } from '@mui/material';

import type { BrandInfo } from '@/core/types';

type Props = {
  brands: BrandInfo[];
};

export const FeaturedBrandsSection = ({ brands }: Props) => {
  return (
    <Box sx={{ width: '100%', padding: '80px 88px', height: '444px' }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '700',
          lineHeight: 1,
        }}
      >
        Featured Brands
      </Typography>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          mt: '47px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {brands.map((brand) => {
          const BrandIcon = brand.icon;
          return (
            <Box key={brand.id}>
              <Box
              sx={{
                width: '280px',
                height: '200px',
                background: 'var(--dark-background)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                border: '1px solid var(--blue-violet)',
                boxShadow: '0 0 6.9px 0 var(--blue-violet)',
              }}
            >
              <Typography
                component="h6"
                variant="h6"
                sx={{
                  display: 'flex',
                  width: '100%',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontWeight: '700',
                  lineHeight: '84%',
                }}
              >
                <BrandIcon style={{ width: '40px', height: '40px' }} />
                {brand.name}
              </Typography>

              <Typography
                component="p"
                sx={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  marginTop: '10px',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '107%',
                }}
              >
                {brand.descr}
              </Typography>
            </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
