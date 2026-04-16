import { Container, Typography } from '@mui/material';

import { AboutStarIcon } from '@/assets';
import { aboutStars, aboutTestimonials } from '@/core/constants';

import './AboutTestimonialsSection.css';

export const AboutTestimonialsSection = () => {
  return (
    <section className="about-testimonials" aria-label="Customer Testimonials">
      <Container disableGutters>
        <div className="about-testimonials__eyebrow-wrap">
          <Typography variant="aboutSectionHeading" sx={{ color: 'var(--dark-yellow)' }}>
            CUSTOMER STORIES
          </Typography>
        </div>
        <div className="about-testimonials__title-wrap">
          <Typography variant="aboutHeading" component="h2" sx={{ color: 'var(--white)' }}>
            What Our Customers Say
          </Typography>
        </div>
        <div className="about-testimonials__description-wrap">
          <Typography
            sx={{
              color: 'var(--light-gray)',
              fontSize: '24px',
              lineHeight: '24px',
              letterSpacing: '-1px',
            }}
          >
            Real reviews from real buyers. We don't edit or filter - you see everything.
          </Typography>
        </div>
        <div className="about-testimonials__grid">
          {aboutTestimonials.map((review) => (
            <article key={review.id} className="about-testimonials__card">
              <div className="about-testimonials__stars" aria-hidden>
                {aboutStars.map((_, index) => (
                  <AboutStarIcon key={index} className="about-testimonials__star-icon" />
                ))}
              </div>
              <div className="about-testimonials__review-wrap">
                <Typography
                  component="p"
                  sx={{
                    color: 'var(--muted-violet)',
                    lineHeight: '34px',
                    fontSize: '18px',
                    letterSpacing: '-1px',
                  }}
                >
                  {review.text}
                </Typography>
              </div>
              <div className="about-testimonials__author">
                <span
                  className={`about-testimonials__author-badge about-testimonials__author-badge--${review.tone}`}
                >
                  {review.initials}
                </span>
                <div>
                  <Typography component="h3" sx={{ color: 'var(--white)', lineHeight: '16px' }}>
                    {review.author}
                  </Typography>
                  <div className="about-testimonials__city-wrap">
                    <Typography
                      component="p"
                      sx={{ color: 'var(--muted-violet)', lineHeight: '14px' }}
                    >
                      {review.city}
                    </Typography>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

