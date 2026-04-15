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
          <Typography variant="aboutSectionHeading">
            THE PEOPLE BEHIND <span style={{ color: 'var(--light-violet)' }}>GADGETROOM</span>
          </Typography>
        </div>
        <div className="about-team__title-wrap">
          <Typography variant="aboutHeading" component="h2">
            Meet Our Team
          </Typography>
        </div>
        <div className="about-team__description-wrap">
          <Typography sx={{ color: 'var(--grey-violet)', fontSize: '24px', lineHeight: '28px' }}>
            A passionate group of tech enthusiasts and retail professionals dedicated to bringing
            you the best gadget-buying experience.
          </Typography>
        </div>

        <div className="about-team__grid">
          {teamMembers.map((person) => (
            <article key={person.id} className="about-team__card">
              <div className="about-team__avatar-wrap">
                <div className="about-team__avatar">{person.initials}</div>
              </div>
              <div className="about-team__name-wrap">
                <Typography
                  component="h3"
                  sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
                >
                  {person.name}
                </Typography>
              </div>
              <div className="about-team__role-wrap">
                <Typography
                  component="p"
                  sx={{
                    color: 'var(--grey-violet)',
                    fontSize: '20px',
                    lineHeight: '20px',
                    letterSpacing: '-1px',
                    fontWeight: 600,
                  }}
                >
                  {person.role}
                </Typography>
              </div>
              <div className="about-team__text-wrap">
                <Typography
                  component="p"
                  sx={{
                    color: 'var(--grey-violet)',
                    fontSize: '16px',
                    lineHeight: '20px',
                    letterSpacing: '-1px',
                  }}
                >
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
