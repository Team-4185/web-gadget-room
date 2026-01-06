import { Box } from '@mui/material';

import Heroimg from '/Home/hero-img.png';

import './HeroSection.css';

type Props = {
  title: { regular: string; bold: string };
  subtitle: string;
  onBuyNow: () => void;
};

export const HeroSection = ({ title, subtitle, onBuyNow }: Props) => {
  return (
    <Box className="hero_container">
      <Box className="hero_info">
        <span className="hero_info__title">
          {title.regular} <span style={{ fontWeight: '600' }}>{title.bold}</span>
        </span>

        <Box className="hero_info__description">
          <span className="hero_info_description__subtitle">{subtitle}</span>
          <button className="hero_info_description__btn" onClick={onBuyNow}>
            Buy Now
          </button>
        </Box>
      </Box>
      <Box className="hero_circle" />
      <img className="hero_img" src={Heroimg} alt="iPhone image" />
    </Box>
  );
};
