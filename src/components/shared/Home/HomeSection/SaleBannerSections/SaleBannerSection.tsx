import { Box } from '@mui/material';
import fire from '/icons/fire.svg';

type Props = {
  onShopDeals: () => void;
};

export const SaleBannerSection = ({ onShopDeals }: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        margin: '0 auto',
        background: '#aeaeae',
        padding: '96px 423px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '594px',
          height: 'max-content',
          gap: '30px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '42px', alignSelf: 'center' }}>
          <img src={fire} alt="fire icon" />
          <span style={{ fontWeight: '800', fontSize: '48px', lineHeight: '98%', color: '#000' }}>
            Big Summer Sale
          </span>
        </Box>

        <span
          style={{
            fontStyle: 'italic',
            fontWeight: '400',
            fontSize: '36px',
            color: '#000',
            height: '32px',
          }}
        >
          Up to 50% off on popular models
        </span>

        <button
          style={{
            display: 'block',
            borderRadius: '15px',
            padding: '8px',
            width: '200px',
            height: '60px',
            boxShadow: '1px 10px 30px 0 rgba(0, 0, 0, 0.25)',
            background: '#fff',
            alignSelf: 'center',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '24px',
            lineHeight: '100%',
            color: '#00',
            fontFamily: 'Montserrat, sans-serif',
          }}
          onClick={onShopDeals}
        >
          Shop Deals
        </button>
      </Box>
    </Box>
  );
};
