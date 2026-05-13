import { Container, Typography } from '@mui/material';

import { aboutTeamMembers } from '@/core/constants';

import './AboutTeamSection.css';

export const AboutTeamSection = () => {
  return (
    <section className="about-team" aria-label="About Team Section">
      <Container disableGutters>
        <div className="about-team__eyebrow-wrap">
          <Typography variant="aboutSectionHeading">
            THE PEOPLE BEHIND <span style={{ color: 'var(--blue-violet)' }}>GADGETROOM</span>
          </Typography>
        </div>
        <div className="about-team__title-wrap">
          <Typography variant="aboutHeading" component="h2">
            Meet Our Team
          </Typography>
        </div>
        <div className="about-team__description-wrap">
          <Typography
            sx={{
              color: 'var(--muted-violet)',
              fontSize: '24px',
              lineHeight: '30px',
              letterSpacing: '-1px',
            }}
          >
            A passionate group of tech enthusiasts and retail professionals dedicated to bringing
            you the best gadget-buying experience.
          </Typography>
        </div>

        <div className="about-team__grid">
          {aboutTeamMembers.map((person) => (
            <article key={person.id} className="about-team__card">
              <div className="about-team__avatar-wrap">
                <div className="about-team__avatar">{person.initials}</div>
              </div>
              <div className="about-team__name-wrap">
                <Typography
                  component="h3"
                  sx={{
                    fontSize: '24px',
                    lineHeight: '34px',
                    fontWeight: 600,
                    letterSpacing: '-1px',
                  }}
                >
                  {person.name}
                </Typography>
              </div>
              <div className="about-team__role-wrap">
                <Typography
                  component="p"
                  sx={{
                    color: 'var(--dark-gray-violet)',
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
                    color: 'var(--muted-violet)',
                    fontSize: '16px',
                    lineHeight: '20px',
                    letterSpacing: '-2px',
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
