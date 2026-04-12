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
        <Typography className="about-testimonials__eyebrow">CUSTUMER STORIES</Typography>
        <Typography variant="h2" component="h2" className="about-testimonials__title">
          What Our Customers Say
        </Typography>
        <Typography className="about-testimonials__description">
          Real reviews from real buyers. We don't edit or filter - you see everything.
        </Typography>
        <div className="about-testimonials__grid">
          {testimonials.map((review) => (
            <article key={review.id} className="about-testimonials__card">
              <Typography component="p" className="about-testimonials__stars">
                ★★★★★
              </Typography>
              <Typography component="p" className="about-testimonials__review">
                {review.text}
              </Typography>
              <div className="about-testimonials__author">
                <span className={`about-testimonials__author-badge about-testimonials__author-badge--${review.tone}`}>
                  {review.initials}
                </span>
                <div>
                  <Typography component="h3">{review.author}</Typography>
                  <Typography component="p">{review.city}</Typography>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
