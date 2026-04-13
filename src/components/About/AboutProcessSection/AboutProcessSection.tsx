import { Container, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import './AboutProcessSection.css';

const processSteps = [
  {
    id: 1,
    title: 'Supplier Vetting',
    text: 'We partner only with certified, authorized suppliers. Every vendor undergoes strict quality screening.',
    tone: 'lavender',
    Icon: PersonIcon,
  },
  {
    id: 2,
    title: 'Quality Check',
    text: 'Every product is inspected and verified. Accessories are tested, specs are confirmed accurate.',
    tone: 'blue',
    Icon: CheckIcon,
  },
  {
    id: 3,
    title: 'Catalog Listing',
    text: 'Products are listed with full specs, real photos, honest pricing, and clear warranty information.',
    tone: 'amber',
    Icon: CreditCardIcon,
  },
  {
    id: 4,
    title: 'Delivery & Support',
    text: 'Fast shipping across Ukraine. Post-sale support and hassle-free returns within 14 days.',
    tone: 'green',
    Icon: LocalShippingIcon,
  },
] as const;

export const AboutProcessSection = () => {
  return (
    <section className="about-process" aria-label="How We Work Section">
      <Container disableGutters>
        <div className="about-process__eyebrow-wrap">
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
            OUR PROCESS
          </Typography>
        </div>
        <div className="about-process__title-wrap">
          <Typography variant="h2" component="h2" sx={{ color: '#2d2d2d' }}>
            How We Work
          </Typography>
        </div>
        <div className="about-process__description-wrap">
          <Typography sx={{ color: '#8f8faf', fontSize: '18px', lineHeight: '28px' }}>
            From selecting products to delivering them at your door - here's how GadgetRoom operates.
          </Typography>
        </div>

        <div className="about-process__line">
          {processSteps.map((step) => (
            <article key={step.id} className="about-process__item">
              <div className={`about-process__dot about-process__dot--${step.tone}`}>
                <step.Icon sx={{ fontSize: '20px' }} />
              </div>
              <Typography component="h3" sx={{ fontSize: '31px', lineHeight: '28px', color: '#2f2f42', fontWeight: 600 }}>
                {step.title}
              </Typography>
              <div className="about-process__item-text-wrap">
                <Typography component="p" sx={{ fontSize: '13px', lineHeight: '19px', color: '#8f8faf' }}>
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
