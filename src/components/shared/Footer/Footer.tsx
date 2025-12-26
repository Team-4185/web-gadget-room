import { Box, Container } from '@mui/material';

import Logo from '/icons/Logo.png';
import LogoText from '/icons/LogoText.svg';
import Location from '/icons/Location.svg';
import Clock from '/icons/Clock.svg';
import Phone from '/icons/Phone.svg';
import Mail from '/icons/Mail.svg';
import Visa from '/icons/Payment Services/visa.png';
import MasterCard from '/icons/Payment Services/mastercard.png';
import ApplePay from '/icons/Payment Services/ApplePay.png';
import GooglePay from '/icons/Payment Services/GooglePay.png';
import NovaPost from '/icons/Payment Services/NovaPost.png';
import DHL from '/icons/Payment Services/DHL.png';

import './Footer.css';

export const Footer = () => {
  return (
    <Container component="footer" disableGutters maxWidth="xl" className="footer-container">
      <Box className="footer-main">
        {/* Первая колонка */}
        <Box className="footer-col1">
          <Box className="footer-logo">
            <img src={Logo} alt="Logo" />
            <img src={LogoText} alt="GadgetRoom" />
          </Box>
          <Box>
            <p>
              Online store of smartphones and gadgets. Official suppliers, quality guarantee, fast
              delivery throughout Ukraine.
            </p>
          </Box>
        </Box>

        {/* Вторая колонка */}
        <Box className="footer-col2">
          {/* Контакты */}
          <Box className="footer-contacts">
            <span>Contacts</span>
            <Box>
              <img src={Location} alt="Location icon" />
              <span>Kyiv, Khreshchatyk St., 42</span>
            </Box>
            <Box>
              <img src={Clock} alt="Clock icon" />
              <span>Mon-Sun: 09:00-21:00</span>
            </Box>
            <Box>
              <img src={Phone} alt="Phone icon" />
              <span>0 800 123 456</span>
            </Box>
            <Box>
              <img src={Mail} alt="Mail icon" />
              <span>info@gatgetroom.ua</span>
            </Box>
          </Box>

          {/* Оплата и доставка */}
          <Box className="footer-payment">
            <span>Payment & Delivery</span>
            <Box className="footer-payment-row">
              <img src={Visa} alt="Visa" />
              <img src={MasterCard} alt="MasterCard" />
              <img src={ApplePay} alt="ApplePay" />
              <img src={GooglePay} alt="GooglePay" />
            </Box>
            <Box className="footer-payment-row">
              <img src={NovaPost} alt="NovaPost" />
              <img src={DHL} alt="DHL" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
