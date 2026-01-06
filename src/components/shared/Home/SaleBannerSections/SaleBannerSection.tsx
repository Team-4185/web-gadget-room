import { Box } from '@mui/material';
import fire from '/icons/fire.svg';
import PhoneFront from '/Home/PhoneFront.png';
import PhoneBack from '/Home/PhoneBack.png';

import './SaleBannerSection.css';

type Props = {
  onShopDeals: () => void;
};

export const SaleBannerSection = ({ onShopDeals }: Props) => {
  return (
    <Box className="banner_container">
      <Box className="banner_info">
        <Box className="banner_info__title_box">
          <img src={fire} alt="fire icon" />
          <span className="banner_info__title">
            Big Summer <span>Sale</span>
          </span>
        </Box>

        <span className="banner_info__description">Up to 50% off on popular models</span>

        <button className="banner_info__btn" onClick={onShopDeals}>
          Shop Deals
        </button>
      </Box>
      <img className="phone_front" src={PhoneFront} alt="iPhone" />
      <img className="phone_back" src={PhoneBack} alt="iPhone" />
    </Box>
  );
};
