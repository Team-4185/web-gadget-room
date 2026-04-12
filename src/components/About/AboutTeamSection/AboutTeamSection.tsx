import { Container, Typography } from '@mui/material';

import './AboutTeamSection.css';

const teamMembers = [
  {
    id: 1,
    name: 'Artem Kovalenko',
    role: 'FOUNDER & CEO',
    text: '10+ years in tech retail. Passionate about making gadgets accessible to everyone in Ukraine.',
    initials: 'AK',
  },
  {
    id: 2,
    name: 'Olena Shevchenko',
    role: 'HEAD OF PRODUCT',
    text: 'Curates our catalog with an eye for quality and value. Every listing passes her approval.',
    initials: 'OS',
  },
  {
    id: 3,
    name: 'Vasyl Marchenko',
    role: 'LOGISTIC MANAGER',
    text: 'Ensures every order reaches you on time. Manages relationships with all delivery partners.',
    initials: 'VM',
  },
  {
    id: 4,
    name: 'Yulia Petrenko',
    role: 'CUSTOMER EXPERIENCE',
    text: 'Heads our support team. Committed to resolving every issue within 24 hours.',
    initials: 'YP',
  },
] as const;

export const AboutTeamSection = () => {
  return (
    <section className="about-team" aria-label="About Team Section">
      <Container disableGutters>
        <Typography className="about-team__eyebrow">
          THE PEOPLE BEHIND <span>GADGETROOM</span>
        </Typography>
        <Typography variant="h2" component="h2" className="about-team__title">
          Meet Our Team
        </Typography>
        <Typography className="about-team__description">
          A passionate group of tech enthusiasts and retail professionals dedicated to bringing you
          the best gadget-buying experience.
        </Typography>

        <div className="about-team__grid">
          {teamMembers.map((person) => (
            <article key={person.id} className="about-team__card">
              <div className="about-team__avatar-wrap">
                <div className="about-team__avatar">{person.initials}</div>
              </div>
              <Typography component="h3" className="about-team__name">
                {person.name}
              </Typography>
              <Typography component="p" className="about-team__role">
                {person.role}
              </Typography>
              <Typography component="p" className="about-team__text">
                {person.text}
              </Typography>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
