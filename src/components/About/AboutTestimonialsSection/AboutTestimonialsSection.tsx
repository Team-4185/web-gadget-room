import { Container, Typography } from '@mui/material';

import { AboutStarIcon } from '@/assets';

import './AboutTestimonialsSection.css';

const testimonials = [
  {
    id: 1,
    author: 'Mykola H.',
    city: 'Kyiv',
    initials: 'MH',
    tone: 'teal',
    text: '"Ordered an iPhone 15 Pro - arrived in Kyiv within 2 days, original packaging, official warranty card. GadgetRoom is now my go-to for everything tech!"',
  },
  {
    id: 2,
    author: 'Sofiya D.',
    city: 'Lviv',
    initials: 'SD',
    tone: 'yellow',
    text: '"Compared prices across 6 stores. GadgetRoom was cheapest AND had the best warranty terms. Support answered my questions instantly, 10/10 recommend!"',
  },
  {
    id: 3,
    author: 'Roman P.',
    city: 'Odesa',
    initials: 'RP',
    tone: 'blue',
    text: '"Had a small issue with my order - wrong color sent. They replaced it next day, no questions asked. That kind of service is rare. Respect to the whole team!"',
  },
] as const;

const stars = Array.from({ length: 5 });

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
          {testimonials.map((review) => (
            <article key={review.id} className="about-testimonials__card">
              <div className="about-testimonials__stars" aria-hidden>
                {stars.map((_, index) => (
                  <AboutStarIcon key={index} className="about-testimonials__star-icon" />
                ))}
              </div>
              <div className="about-testimonials__review-wrap">
                <Typography
                  component="p"
                  sx={{
                    color: 'var(--grey-violet)',
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
                      sx={{ color: 'var(--grey-violet)', lineHeight: '14px' }}
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
