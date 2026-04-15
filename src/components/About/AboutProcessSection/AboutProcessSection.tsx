import { Container, Typography } from '@mui/material';

import { AboutCardIcon, AboutDeliveryIcon, AboutUserIcon, Check } from '@/assets';

import './AboutProcessSection.css';

const processSteps = [
  {
    id: 1,
    title: 'Supplier Vetting',
    text: 'We partner only with certified, authorized suppliers. Every vendor undergoes strict quality screening.',
    tone: 'lavender',
    Icon: AboutUserIcon,
  },
  {
    id: 2,
    title: 'Quality Check',
    text: 'Every product is inspected and verified. Accessories are tested, specs are confirmed accurate.',
    tone: 'blue',
    Icon: Check,
  },
  {
    id: 3,
    title: 'Catalog Listing',
    text: 'Products are listed with full specs, real photos, honest pricing, and clear warranty information.',
    tone: 'amber',
    Icon: AboutCardIcon,
  },
  {
    id: 4,
    title: 'Delivery & Support',
    text: 'Fast shipping across Ukraine. Post-sale support and hassle-free returns within 14 days.',
    tone: 'green',
    Icon: AboutDeliveryIcon,
  },
] as const;

export const AboutProcessSection = () => {
  return (
    <section className="about-process" aria-label="How We Work Section">
      <Container disableGutters>
        <div className="about-process__eyebrow-wrap">
          <Typography variant="aboutSectionHeading">OUR PROCESS</Typography>
        </div>
        <div className="about-process__title-wrap">
          <Typography
            variant="aboutHeading"
            component="h2"
            sx={{ fontSize: '48px', lineHeight: '56px', fontWeight: 700 }}
          >
            How We Work
          </Typography>
        </div>
        <div className="about-process__description-wrap">
          <Typography sx={{ color: 'var(--grey-violet)', fontSize: '24px', lineHeight: '28px' }}>
            From selecting products to delivering them at your door - here's how{' '}
            <span style={{ fontWeight: 600 }}>GadgetRoom</span> operates.
          </Typography>
        </div>

        <div className="about-process__line">
          {processSteps.map((step) => (
            <article key={step.id} className="about-process__item">
              <div className={`about-process__dot about-process__dot--${step.tone}`}>
                <step.Icon className="about-process__dot-icon" />
              </div>
              <Typography
                component="h3"
                sx={{ fontSize: '24px', lineHeight: '28px', fontWeight: 600 }}
              >
                {step.title}
              </Typography>
              <div className="about-process__item-text-wrap">
                <Typography
                  component="p"
                  sx={{
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: 'var(--grey-violet)',
                    letterSpacing: '-1px',
                  }}
                >
                  {step.text}
                </Typography>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
