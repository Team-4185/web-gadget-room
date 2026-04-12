import { Container } from '@mui/material';
import { useNavigate } from 'react-router';

import { Button } from '@/components';
import {
  ABOUT_BRANDS,
  ABOUT_CORE_VALUES,
  ABOUT_CTA,
  ABOUT_HERO,
  ABOUT_HERO_BADGES,
  ABOUT_METRICS,
  ABOUT_PROCESS_STEPS,
  ABOUT_TEAM,
  ABOUT_TESTIMONIALS,
} from '@/core/constants';

import './About.css';

export const About = () => {
  const navigate = useNavigate();

  return (
    <section className="about">
      <div className="about__hero">
        <Container disableGutters>
          <div className="about__hero-layout">
            <div className="about__hero-media">
              <img src={ABOUT_HERO.imageSrc} alt="About GadgetRoom" />
            </div>

            <div className="about__hero-content">
              <p className="about__eyebrow">{ABOUT_HERO.eyebrow}</p>
              <h1 className="about__hero-title">{ABOUT_HERO.title}</h1>
              <p className="about__hero-description">{ABOUT_HERO.description}</p>
              <Button maxWidth="165px" height="48px" fontSize="14px">
                {ABOUT_HERO.ctaText}
              </Button>
            </div>

            <div className="about__hero-badges">
              {ABOUT_HERO_BADGES.map((badge) => (
                <article key={badge.id} className="about__badge-card">
                  <h2>{badge.title}</h2>
                  <p>{badge.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div className="about__metrics">
        <Container disableGutters>
          <div className="about__metrics-grid">
            {ABOUT_METRICS.map((item) => (
              <div key={item.id} className="about__metric-item">
                <span>{item.value}</span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="about__values">
        <Container disableGutters>
          <p className="about__eyebrow about__eyebrow--center">WHAT WE STAND FOR</p>
          <h2 className="about__section-title">Our Core Values</h2>
          <p className="about__section-description">
            Built around service quality, honest communication, and long-term customer trust.
          </p>

          <div className="about__values-grid">
            {ABOUT_CORE_VALUES.map((value, index) => (
              <article key={value.id} className="about__value-card">
                <div className={`about__value-icon about__value-icon--${index + 1}`}>{index + 1}</div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </div>

      <div className="about__process">
        <Container disableGutters>
          <p className="about__eyebrow about__eyebrow--center">OUR PROCESS</p>
          <h2 className="about__section-title">How We Work</h2>
          <p className="about__section-description">
            From supplier verification to after-sales support, each step is designed to reduce risk.
          </p>

          <div className="about__process-line">
            {ABOUT_PROCESS_STEPS.map((step, index) => (
              <article key={step.id} className="about__process-item">
                <div className="about__process-dot">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </div>

      <div className="about__team">
        <Container disableGutters>
          <p className="about__eyebrow about__eyebrow--center">THE PEOPLE BEHIND GADGETROOM</p>
          <h2 className="about__section-title">Meet Our Team</h2>
          <div className="about__team-grid">
            {ABOUT_TEAM.map((person) => (
              <article key={person.id} className="about__team-card">
                <div className="about__avatar">{person.initials}</div>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </article>
            ))}
          </div>
        </Container>
      </div>

      <div className="about__testimonials">
        <Container disableGutters>
          <p className="about__eyebrow about__eyebrow--center about__eyebrow--light">
            CUSTOMER STORIES
          </p>
          <h2 className="about__section-title about__section-title--light">What Our Customers Say</h2>
          <div className="about__testimonials-grid">
            {ABOUT_TESTIMONIALS.map((review) => (
              <article key={review.id} className="about__testimonial-card">
                <p className="about__stars">★★★★★</p>
                <p className="about__review">{review.text}</p>
                <div className="about__review-author">
                  <span>{review.initials}</span>
                  <div>
                    <h3>{review.author}</h3>
                    <p>{review.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </div>

      <div className="about__brands">
        <Container disableGutters>
          <p className="about__eyebrow about__eyebrow--center">OFFICIAL PARTNERS & BRANDS WE CARRY</p>
          <div className="about__brands-grid">
            {ABOUT_BRANDS.map((brand) => (
              <div key={brand} className="about__brand-pill">
                {brand}
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="about__cta">
        <Container disableGutters>
          <div className="about__cta-card">
            <div>
              <p className="about__eyebrow">{ABOUT_CTA.eyebrow}</p>
              <h2>{ABOUT_CTA.title}</h2>
              <p>{ABOUT_CTA.text}</p>
            </div>
            <Button maxWidth="239px" height="76px" fontSize="16px" onClick={() => navigate('/catalog')}>
              {ABOUT_CTA.button}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
};

