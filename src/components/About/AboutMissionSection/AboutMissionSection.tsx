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
            <Typography variant="aboutSectionHeading" component="p">
              OUR MISSION
            </Typography>
            <div className="about-mission__title-wrap">
              <Typography
                variant="aboutHeading"
                component="h2"
                sx={{
                  fontSize: '48px',
                  lineHeight: '56px',
                  fontWeight: 700,
                  color: 'var(--black)',
                  letterSpacing: '-2px',
                }}
              >
                Simplifying tech for{' '}
                <span className="about-mission__title-highlight">every Ukrainian</span>
              </Typography>
            </div>
            <div className="about-mission__paragraph about-mission__paragraph--first">
              <Typography
                component="p"
                sx={{
                  fontSize: '24px',
                  lineHeight: '34px',
                  color: 'var(--black)',
                  letterSpacing: '-1px',
                }}
              >
                We believe that quality technology shouldn't be complicated or inaccessible.
                <br />
                <strong>GADGETROOM</strong> was founded with a single vision: to be the most trusted
                place to buy smartphones and gadgets in Ukraine.
              </Typography>
            </div>
            <div className="about-mission__paragraph about-mission__paragraph--second">
              <Typography
                component="p"
                sx={{
                  fontSize: '24px',
                  lineHeight: '34px',
                  color: 'var(--black)',
                  letterSpacing: '-1px',
                }}
              >
                We work only with verified suppliers, test every product before listing, and back
                every purchase with a clear warranty and fast support. Clear specifications, fair
                prices, and reliable support - that's what <strong>GADGETROOM</strong> stands for.
              </Typography>
            </div>
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
                <Typography
                  component="h3"
                  sx={{ fontSize: '20px', lineHeight: '27px', fontWeight: 700 }}
                >
                  Original Devices
                </Typography>
              </div>
              <div className="about-mission__card-copy">
                <Typography
                  component="p"
                  sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}
                >
                  Only verified suppliers and tested smartphones. Every product is authenticated
                  before listing.
                </Typography>
              </div>
            </article>
            <article className="about-mission__card about-mission__card--warranty">
              <div className="about-mission__card-header">
                <GppGoodOutlinedIcon className="about-mission__card-icon" />
                <Typography
                  component="h3"
                  sx={{ fontSize: '20px', lineHeight: '27px', fontWeight: 700 }}
                >
                  Warranty
                </Typography>
              </div>
              <div className="about-mission__card-copy">
                <Typography
                  component="p"
                  sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}
                >
                  Clear warranty policy and fast support response. We stand behind every product we
                  sell.
                </Typography>
              </div>
            </article>
            <article className="about-mission__card about-mission__card--payment">
              <div className="about-mission__card-header">
                <PaymentsOutlinedIcon className="about-mission__card-icon" />
                <Typography
                  component="h3"
                  sx={{ fontSize: '20px', lineHeight: '27px', fontWeight: 700 }}
                >
                  Secure Payment
                </Typography>
              </div>
              <div className="about-mission__card-copy">
                <Typography
                  component="p"
                  sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}
                >
                  Safe and popular payment methods. Visa, Mastercard, Apple Pay, Google Pay and
                  more.
                </Typography>
              </div>
            </article>
            <article className="about-mission__card about-mission__card--delivery">
              <div className="about-mission__card-header">
                <LocalShippingOutlinedIcon className="about-mission__card-icon" />
                <Typography
                  component="h3"
                  sx={{ fontSize: '20px', lineHeight: '27px', fontWeight: 700 }}
                >
                  Fast Delivery
                </Typography>
              </div>
              <div className="about-mission__card-copy">
                <Typography
                  component="p"
                  sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}
                >
                  Clear warranty policy and fast support response. We stand behind every product we
                  sell.
                </Typography>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
};
