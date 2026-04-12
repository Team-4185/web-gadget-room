import {
  AboutHeroSection,
  AboutMissionSection,
  AboutMetricsSection,
  AboutCoreValuesSection,
  AboutProcessSection,
  AboutTeamSection,
  AboutTestimonialsSection,
  AboutBrandsSection,
  AboutCTASection,
} from '@/components';

import './About.css';

export const About = () => {
  return (
    <section className="about">
      <AboutHeroSection />
      <AboutMissionSection />
      <AboutMetricsSection />
      <AboutCoreValuesSection />
      <AboutProcessSection />
      <AboutTeamSection />
      <AboutTestimonialsSection />
      <AboutBrandsSection />
      <AboutCTASection />
    </section>
  );
};

