import { Box } from '@mui/material';
import PromoWide from '/Home/promo-wide-box-img.png';
import PromoLeft from '/Home/promo_left__double_box__left.png';
import PromoRigth from '/Home/promo_left_double_box_rigth.png';
import PromoBig from '/Home/promo_rigth.png';

import './PromoGridSection.css';

export const PromoGridSection = () => {
  return (
    <Box className="promo_container">
      <Box className="promo_left">
        <Box className="promo_left__wide_box">
          <Box>
            <p className="promo_left__wide_box_title">
              New <span>Colors.</span>
              {'\n'}
              New <span>Features.</span>
            </p>
            <p className="promo_left__wide_box_description">
              An incredible camera, a titanium body, and{'\n'}
              the most powerful A19 Pro chip.
            </p>
            <button className="promo_left__wide_box_btn">Buy Now</button>
          </Box>
          <img className="promo_left__wide_box_img" src={PromoWide} alt="phones" />
        </Box>
        <Box className="promo_left__double_box">
          <Box className="promo_left__double_box__left">
            <Box>
              <p className="promo_left__double_box__left__title">
                Xiaomi 15 <span>Pro</span>
              </p>
              <p className="promo_left__double_box__left__desrciption">
                Leica camera, 120W fast{'\n'}
                charging and premium{'\n'}
                design at an affordable{'\n'}
                price.
              </p>
              <button className="promo_left__double_box__left_btn">View</button>
            </Box>
            <img src={PromoLeft} alt="" />
          </Box>
          <Box className="promo_left__double_box__right">
            <p className="promo_left__double_box__right__title">
              Google Pixel 10 <span>Pro</span>
            </p>
            <p className="promo_left__double_box__rigth__description">
              Pure Android, the{'\n'}
              best AI from{'\n'}
              Google, and a{'\n'}
              camera that works{'\n'}
              magic at night.
            </p>
            <button className="promo_left__double_box__rigth__btn">View</button>
            <img
              className="promo_left__double_box__rigth__img"
              src={PromoRigth}
              alt="Google Pixel 10 Pro"
            />
          </Box>
        </Box>
      </Box>

      <Box className="promo_rigth">
        <span className="promo_rigth__title">
          iPhone 17 <span>Pro</span>
        </span>
        <span className="promo_rigth__description">
          The new iPhone 17 arrives in colors{'\n'}
          that capture every side of you.
        </span>
        <Box className="circle1"></Box>
        <Box className="circle2"></Box>
        <img className="promo_rigth_img" src={PromoBig} alt="iPhones" />
      </Box>
    </Box>
  );
};
