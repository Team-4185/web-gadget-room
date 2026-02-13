import type { FC } from 'react';
import { Container, Typography } from '@mui/material';

import {
  ApplePay,
  Clock,
  Copy,
  Dhl,
  GooglePay,
  Location,
  Mail,
  MasterCard,
  NovaPost,
  Phone,
  Planet,
  Visa,
} from '@/assets';
import { Select } from '@/components';
import { LANGUAGES } from '@/core/constants';

import Logo from '/icons/logo.jpg';

import './Footer.css';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Container disableGutters>
        <div className="footer__wrapper">
          <div className="footer__column">
            <img src={Logo} width={307} height={32} alt="Logo" />

            <Typography sx={{ marginTop: '26px', lineHeight: '24px', color: 'var(--black)' }}>
              Online store of smartphones and gadgets.Official suppliers, quality guarantee, fast
              delivery throughout Ukraine.
            </Typography>
          </div>

          <div className="footer__group">
            <div className="footer__column">
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  color: 'var(--black)',
                }}
              >
                Contacts
              </Typography>

              <address className="footer__list">
                <div className="footer__item">
                  <Location width={16} height={16} />
                  <Typography sx={{ lineHeight: '24px', color: 'var(--black)' }}>
                    Kyiv, Khreshchatyk St., 42
                  </Typography>
                </div>

                <div className="footer__item">
                  <Clock width={16} height={16} />
                  <Typography sx={{ lineHeight: '24px', color: 'var(--black)' }}>
                    Mon-Sun: 09:00-21:00
                  </Typography>
                </div>

                <div className="footer__item">
                  <Phone width={16} height={16} />
                  <Typography sx={{ lineHeight: '24px', color: 'var(--black)' }}>
                    0 800 123 456
                  </Typography>

                  <Copy
                    className="footer__copy"
                    onClick={() => navigator.clipboard?.writeText('info@gadgetroom.ua')}
                  />
                </div>

                <div className="footer__item">
                  <Mail width={16} height={16} />
                  <Typography sx={{ lineHeight: '24px', color: 'var(--black)' }}>
                    info@gadgetroom.ua
                  </Typography>

                  <Copy
                    className="footer__copy"
                    onClick={() => navigator.clipboard?.writeText('info@gadgetroom.ua')}
                  />
                </div>
              </address>
            </div>

            <div className="footer__column">
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  color: 'var(--black)',
                }}
              >
                Payment &amp; Delivery
              </Typography>

              <div className="footer__row" aria-label="Payment methods">
                <Visa height={20} />
                <MasterCard />
                <ApplePay />
                <GooglePay height={20} />
              </div>

              <div className="footer__row" aria-label="Delivery methods">
                <NovaPost />
                <Dhl />
              </div>

              <div className="footer__row">
                <Select
                  data={LANGUAGES}
                  maxWidth="140px"
                  height="40px"
                  color="var(--navy-blue)"
                  fontSize="13px"
                  startIcon={<Planet />}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
