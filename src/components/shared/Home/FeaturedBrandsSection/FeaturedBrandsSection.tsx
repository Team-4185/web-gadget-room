import { Box, Typography } from '@mui/material';

import type { BrandInfo } from '@/core/types';

type Props = {
  brands: BrandInfo[];
};

export const FeaturedBrandsSection = ({ brands }: Props) => {
  return (
    <Box sx={{ width: '100%', padding: '80px 88px', height: '444px' }}>
      <Typography
        sx={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '700',
          fontSize: '48px',
          lineHeight: 1,
          color: '#000',
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
        {brands.map((brand) => (
          <div key={brand.id}>
            <Box
              sx={{
                width: '280px',
                height: '200px',
                background: 'rgba(4, 4, 255, 0.05)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                border: '1px solid #7777BF',
                boxShadow: '0 0 6.9px 0 #7777BF',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  width: '100%',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '700',
                  fontSize: '32px',
                  lineHeight: '84%',
                  color: '#000',
                }}
              >
                <img style={{ width: '40px', height: '40px' }} src={brand.icon} />
                {brand.name}
              </span>

              <span
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  marginTop: '10px',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '107%',
                  color: '#000',
                }}
              >
                {brand.descr}
              </span>
            </Box>
          </div>
        ))}
      </Box>
    </Box>
  );
};
