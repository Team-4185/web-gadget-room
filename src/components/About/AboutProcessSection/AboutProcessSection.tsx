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
        <Typography className="about-process__eyebrow">OUR PROCESS</Typography>
        <Typography variant="h2" component="h2" className="about-process__title">
          How We Work
        </Typography>
        <Typography className="about-process__description">
          From selecting products to delivering them at your door - here's how GadgetRoom operates.
        </Typography>

        <div className="about-process__line">
          {processSteps.map((step) => (
            <article key={step.id} className="about-process__item">
              <div className={`about-process__dot about-process__dot--${step.tone}`}>
                <step.Icon sx={{ fontSize: '20px' }} />
              </div>
              <Typography component="h3" className="about-process__item-title">
                {step.title}
              </Typography>
              <Typography component="p" className="about-process__item-text">
                {step.text}
              </Typography>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
