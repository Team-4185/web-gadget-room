import { Container, Typography } from '@mui/material';

import { ABOUT_TEAM } from '@/core/constants';

import './AboutTeamSection.css';

export const AboutTeamSection = () => {
  return (
    <section className="about-team" aria-label="About Team Section">
      <Container disableGutters>
        <Typography className="about-team__eyebrow">THE PEOPLE BEHIND GADGETROOM</Typography>
        <Typography variant="h2" component="h2" className="about-team__title">
          Meet Our Team
        </Typography>

        <div className="about-team__grid">
          {ABOUT_TEAM.map((person) => (
            <article key={person.id} className="about-team__card">
              <div className="about-team__avatar">{person.initials}</div>
              <Typography component="h3" className="about-team__name">
                {person.name}
              </Typography>
              <Typography component="p" className="about-team__role">
                {person.role}
              </Typography>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

