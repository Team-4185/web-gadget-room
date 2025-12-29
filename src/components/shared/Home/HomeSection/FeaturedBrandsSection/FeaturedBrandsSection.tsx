import { Box } from '@mui/material';

import type { Brand } from './index';

type Props = {
  brands: Brand[];
};

export const FeaturedBrandsSection = ({ brands }: Props) => {
  return (
    <Box sx={{ width: '100%', padding: '80px 88px', height: '444px' }}>
      <span
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '700',
          fontSize: '48px',
          lineHeight: '0%',
          color: '#000',
        }}
      >
        Featured Brands
      </span>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          mt: '50px',
          justifyContent: 'space-between',
        }}
      >
        {brands.map((brand) => (
          <div key={brand.id}>
            <Box
              sx={{
                width: '280px',
                height: '200px',
                background: '#aeaeae',
                borderRadius: '20px',
                padding: '63px 65px',
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
