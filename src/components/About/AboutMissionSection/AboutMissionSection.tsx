import { Container, Typography } from '@mui/material';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import { Button } from '@/components';

import './AboutMissionSection.css';

export const AboutMissionSection = () => {
  return (
    <section className="about-mission" aria-label="About Mission Section">
      <Container disableGutters>
        <div className="about-mission__layout">
          <div className="about-mission__content">
            <Typography component="p" className="about-mission__eyebrow">
              OUR MISSION
            </Typography>
            <Typography variant="h2" component="h2" className="about-mission__title">
              Simplifying tech for <span>every Ukrainian</span>
            </Typography>
            <Typography component="p" className="about-mission__paragraph">
              We believe that quality technology shouldn't be complicated or inaccessible.
              <br />
              <strong>GadgetRoom</strong> was founded with a single vision: to be the most trusted place to
              buy smartphones and gadgets in Ukraine.
            </Typography>
            <Typography component="p" className="about-mission__paragraph">
              We work only with verified suppliers, test every product before listing, and back every
              purchase with a clear warranty and fast support. Clear specifications, fair prices, and
              reliable support - that's what <strong>GADGETROOM</strong> stands for.
            </Typography>
            <Button
              maxWidth="190px"
              height="56px"
              fontSize="16px"
              sx={{ background: 'var(--blue-violet)', color: 'var(--white)', border: 'none' }}
            >
              GO TO CATALOG
            </Button>
          </div>

          <div className="about-mission__cards">
            <article className="about-mission__card about-mission__card--original">
              <div className="about-mission__card-header">
                <VerifiedUserOutlinedIcon className="about-mission__card-icon" />
                <Typography component="h3" className="about-mission__card-title">
                  Original Devices
                </Typography>
              </div>
              <Typography component="p" className="about-mission__card-text">
                Only verified suppliers and tested smartphones. Every product is authenticated before
                listing.
              </Typography>
            </article>
            <article className="about-mission__card about-mission__card--warranty">
              <div className="about-mission__card-header">
                <GppGoodOutlinedIcon className="about-mission__card-icon" />
                <Typography component="h3" className="about-mission__card-title">
                  Warranty
                </Typography>
              </div>
              <Typography component="p" className="about-mission__card-text">
                Clear warranty policy and fast support response. We stand behind every product we sell.
              </Typography>
            </article>
            <article className="about-mission__card about-mission__card--payment">
              <div className="about-mission__card-header">
                <PaymentsOutlinedIcon className="about-mission__card-icon" />
                <Typography component="h3" className="about-mission__card-title">
                  Secure Payment
                </Typography>
              </div>
              <Typography component="p" className="about-mission__card-text">
                Safe and popular payment methods. Visa, Mastercard, Apple Pay, Google Pay and more.
              </Typography>
            </article>
            <article className="about-mission__card about-mission__card--delivery">
              <div className="about-mission__card-header">
                <LocalShippingOutlinedIcon className="about-mission__card-icon" />
                <Typography component="h3" className="about-mission__card-title">
                  Fast Delivery
                </Typography>
              </div>
              <Typography component="p" className="about-mission__card-text">
                Clear warranty policy and fast support response. We stand behind every product we sell.
              </Typography>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
};
