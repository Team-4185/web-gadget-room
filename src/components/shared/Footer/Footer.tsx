import { Box, Container, Typography } from '@mui/material';

import LogoIcon from '/icons/LogoIcons/logoIcon.svg';
import LogoText from '/icons/LogoIcons/logoText.svg';
import Location from '/icons/ContactsIcons/location.svg';
import Phone from '/icons/ContactsIcons/phone.svg';
import Clock from '/icons/ContactsIcons/clock.svg';
import Mail from '/icons/ContactsIcons/mail.svg';
import Visa from '/icons/PaymentIcons/visa.svg';
import MasterCard from '/icons/PaymentIcons/mastercard.svg';
import ApplePay from '/icons/PaymentIcons/applepay.svg';
import GooglePay from '/icons/PaymentIcons/googlepay.svg';
import NovaPost from '/icons/DeliveryIcons/novapost.svg';
import DHL from '/icons/DeliveryIcons/dhl.svg';
import CopyIcon from '/icons/copy.svg';

import './Footer.css';

export const Footer = () => {
  const address: string = 'Kyiv, Khreshchatyk St., 42';
  const workingHours: string = 'Mon-Sun: 09:00-21:00';
  const phoneNumber: string = '0 800 123 456';
  const email: string = 'info@gadgetroom.ua';

  return (
    <Container className="footer" component="footer" disableGutters maxWidth="xl">
      <Box className="footer__column">
        <Box className="footer__brand">
          <img src={LogoIcon} alt="Logo" />
          <img src={LogoText} alt="GadgetRoom" />
        </Box>

        <Typography className="footer__text">
          <Box>Online store of smartphones and gadgets.</Box>
          <Box>Official suppliers, quality guarantee,</Box>
          <Box>fast delivery throughout Ukraine.</Box>
        </Typography>
      </Box>

      <Box className="footer__column">
        <Typography className="footer__title">Contacts</Typography>

        <address className="footer__list">
          <Box className="footer__item">
            <span className="footer__icon" aria-hidden="true">
              <img src={Location} alt="Location" />
            </span>
            <span>{address}</span>
          </Box>

          <Box className="footer__item">
            <span className="footer__icon" aria-hidden="true">
              <img src={Clock} alt="Clock" />
            </span>
            <span>{workingHours}</span>
          </Box>

          <Box className="footer__item">
            <span className="footer__icon" aria-hidden="true">
              <img src={Phone} alt="Phone" />
            </span>
            <span className="footer__mono">{phoneNumber}</span>
            <span
              className="footer__copy"
              aria-hidden="true"
              onClick={() => navigator.clipboard?.writeText(phoneNumber)}
            >
              <img src={CopyIcon} alt="Copy" />
            </span>
          </Box>

          <Box className="footer__item">
            <span className="footer__icon" aria-hidden="true">
              <img src={Mail} alt="Mail" />
            </span>
            <span className="footer__mono">{email}</span>
            <span
              className="footer__copy"
              aria-hidden="true"
              onClick={() => navigator.clipboard?.writeText(email)}
            >
              <img src={CopyIcon} alt="Copy" />
            </span>
          </Box>
        </address>
      </Box>

      <Box className="footer__column">
        <Typography className="footer__title">PAYMENT &amp; DELIVERY</Typography>

        <Box className="footer__row" aria-label="Payment methods">
          <img className="footer__pay-icon" src={Visa} alt="Visa" />
          <img className="footer__pay-icon" src={MasterCard} alt="Mastercard" />
          <img className="footer__pay-icon" src={ApplePay} alt="Apple Pay" />
          <img className="footer__pay-icon" src={GooglePay} alt="Google Pay" />
        </Box>

        <Box className="footer__row" aria-label="Delivery methods">
          <img className="footer__delivery-icon" src={NovaPost} alt="Nova Post" />
          <img className="footer__delivery-icon" src={DHL} alt="DHL" />
        </Box>
      </Box>
    </Container>
  );
};
