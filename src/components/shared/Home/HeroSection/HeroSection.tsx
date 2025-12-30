import { Box } from '@mui/material';

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
        background: '#b7b7b7',
        padding: '167px 559px 188px 79px',
      }}
    >
      <Box>
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontStyle: 'italic',
            fontWeight: '300',
            fontSize: '96px',
            lineHeight: '75%',
            letterSpacing: '-0.05em',
            color: '#f8fcff',
          }}
        >
          {title.regular} <span style={{ fontWeight: '600' }}>{title.bold}</span>
        </span>

        <span
          style={{
            marginTop: '31px',
            marginBottom: '74px',
            display: 'block',
            fontWeight: '600',
            fontSize: '24px',
            lineHeight: '100%',
            color: '#fff',
          }}
        >
          {subtitle}
        </span>

        <button
          style={{
            borderRadius: '15px',
            padding: '8px',
            width: '200px',
            boxShadow: '1px 10px 30px 0 rgba(0, 0, 0, 0.25)',
            background: '#fff',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            fontSize: '24px',
            lineHeight: '100%',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
          }}
          onClick={onBuyNow}
        >
          Buy Now
        </button>
      </Box>
    </Box>
  );
};
