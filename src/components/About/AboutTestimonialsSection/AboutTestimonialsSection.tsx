import { Container, Typography } from '@mui/material';

import './AboutTestimonialsSection.css';

const testimonials = [
  {
    id: 1,
    author: 'Mykola H.',
    city: 'Kyiv',
    initials: 'KH',
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
    initials: 'RM',
    tone: 'blue',
    text: '"Had a small issue with my order - wrong color sent. They replaced it next day, no questions asked. That kind of service is rare. Respect to the whole team!"',
  },
] as const;

export const AboutTestimonialsSection = () => {
  return (
    <section className="about-testimonials" aria-label="Customer Testimonials">
      <Container disableGutters>
        <div className="about-testimonials__eyebrow-wrap">
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '20px',
              color: 'var(--light-yellow)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            CUSTUMER STORIES
          </Typography>
        </div>
        <div className="about-testimonials__title-wrap">
          <Typography variant="h2" component="h2" sx={{ color: 'var(--white)' }}>
            What Our Customers Say
          </Typography>
        </div>
        <div className="about-testimonials__description-wrap">
          <Typography sx={{ color: '#c5c5d6', fontSize: '15px', lineHeight: '24px' }}>
            Real reviews from real buyers. We don't edit or filter - you see everything.
          </Typography>
        </div>
        <div className="about-testimonials__grid">
          {testimonials.map((review) => (
            <article key={review.id} className="about-testimonials__card">
              <Typography component="p" sx={{ color: 'var(--amber)', fontSize: '15px', letterSpacing: '1.5px' }}>
                ★★★★★
              </Typography>
              <div className="about-testimonials__review-wrap">
                <Typography component="p" sx={{ color: '#8f8faf', lineHeight: '32px', fontSize: '15px' }}>
                  {review.text}
                </Typography>
              </div>
              <div className="about-testimonials__author">
                <span className={`about-testimonials__author-badge about-testimonials__author-badge--${review.tone}`}>
                  {review.initials}
                </span>
                <div>
                  <Typography component="h3" sx={{ color: 'var(--white)', fontSize: '14px', lineHeight: '16px' }}>
                    {review.author}
                  </Typography>
                  <div className="about-testimonials__city-wrap">
                    <Typography component="p" sx={{ color: '#8d8d8d', fontSize: '12px', lineHeight: '14px' }}>
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
