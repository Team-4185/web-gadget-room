import { Container, Typography } from '@mui/material';

import { ABOUT_TESTIMONIALS } from '@/core/constants';

import './AboutTestimonialsSection.css';

export const AboutTestimonialsSection = () => {
  return (
    <section className="about-testimonials" aria-label="Customer Testimonials">
      <Container disableGutters>
        <Typography className="about-testimonials__eyebrow">CUSTOMER STORIES</Typography>
        <Typography variant="h2" component="h2" className="about-testimonials__title">
          What Our Customers Say
        </Typography>
        <div className="about-testimonials__grid">
          {ABOUT_TESTIMONIALS.map((review) => (
            <article key={review.id} className="about-testimonials__card">
              <Typography component="p" className="about-testimonials__stars">
                ★★★★★
              </Typography>
              <Typography component="p" className="about-testimonials__review">
                {review.text}
              </Typography>
              <div className="about-testimonials__author">
                <span>{review.initials}</span>
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

