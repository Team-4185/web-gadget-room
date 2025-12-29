import { Box } from '@mui/material';

export const PromoGridSection = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ width: '100%', height: '314px', background: '#797979' }}></Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '50%', height: '272px', background: '#fff' }}></Box>
          <Box sx={{ width: '50%', height: '272px', background: '#aeaeae' }}></Box>
        </Box>
      </Box>

      <Box sx={{ width: '50%', background: '#717171', padding: '177px 252px  316px 30px' }}>
        <span
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
        </span>
        <span
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
        </span>
      </Box>
    </Box>
  );
};
