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
        <div className="about-team__eyebrow-wrap">
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '20px',
              color: 'var(--blue-violet)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            THE PEOPLE BEHIND <span>GADGETROOM</span>
          </Typography>
        </div>
        <div className="about-team__title-wrap">
          <Typography variant="h2" component="h2" sx={{ color: '#2d2d2d' }}>
            Meet Our Team
          </Typography>
        </div>
        <div className="about-team__description-wrap">
          <Typography sx={{ color: '#8f8faf', fontSize: '18px', lineHeight: '28px' }}>
            A passionate group of tech enthusiasts and retail professionals dedicated to bringing you
            the best gadget-buying experience.
          </Typography>
        </div>

        <div className="about-team__grid">
          {teamMembers.map((person) => (
            <article key={person.id} className="about-team__card">
              <div className="about-team__avatar-wrap">
                <div className="about-team__avatar">{person.initials}</div>
              </div>
              <Typography component="h3" sx={{ fontSize: '34px', lineHeight: '34px', color: '#2d2d2d' }}>
                {person.name}
              </Typography>
              <div className="about-team__role-wrap">
                <Typography component="p" sx={{ color: '#5d68a8', fontSize: '20px', lineHeight: '20px' }}>
                  {person.role}
                </Typography>
              </div>
              <div className="about-team__text-wrap">
                <Typography component="p" sx={{ color: '#8f8faf', fontSize: '14px', lineHeight: '20px' }}>
                  {person.text}
                </Typography>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
