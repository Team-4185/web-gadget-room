import { useNavigate } from 'react-router';
import { Container, Typography } from '@mui/material';

import { Button } from '@/components';
import { aboutMissionCards } from '@/core/constants';

import './AboutMissionSection.css';

export const AboutMissionSection = () => {
  const navigate = useNavigate();

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
              borderRadius="8px"
              sx={{ marginTop: '40px' }}
              onClick={() => navigate('/catalog')}
            >
              GO TO CATALOG
            </Button>
          </div>

          <div className="about-mission__cards">
            {aboutMissionCards.map((card) => (
              <article
                key={card.id}
                className={`about-mission__card about-mission__card--${card.id}`}
              >
                <div className="about-mission__card-header">
                  <card.Icon className="about-mission__card-icon" />
                  <Typography
                    component="h3"
                    sx={{ fontSize: '20px', lineHeight: '27px', fontWeight: 700 }}
                  >
                    {card.title}
                  </Typography>
                </div>
                <div className="about-mission__card-copy">
                  <Typography
                    component="p"
                    sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}
                  >
                    {card.text}
                  </Typography>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
