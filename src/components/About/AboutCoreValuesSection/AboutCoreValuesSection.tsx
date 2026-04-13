import { Container, Typography } from '@mui/material';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import './AboutCoreValuesSection.css';

const coreValues = [
  {
    id: 1,
    valueLabel: 'VALUE 01',
    title: 'Transparency',
    text: 'No hidden fees, no misleading specs. We show complete and honest product information so you can make confident buying decisions.',
    tone: 'violet',
    Icon: VerifiedUserOutlinedIcon,
  },
  {
    id: 2,
    valueLabel: 'VALUE 02',
    title: 'Customer First',
    text: 'Every feature, policy, and process is designed around the customer. Your satisfaction is not a metric - it is our mission.',
    tone: 'lavender',
    Icon: PersonIcon,
  },
  {
    id: 3,
    valueLabel: 'VALUE 03',
    title: 'Quality Assurance',
    text: 'Each product is sourced from certified suppliers and passes quality checks before appearing in our catalog.',
    tone: 'green',
    Icon: SyncAltIcon,
  },
  {
    id: 4,
    valueLabel: 'VALUE 04',
    title: 'Ukraine-Focused',
    text: 'Based in Kyiv, we understand Ukrainian customers. Fast domestic delivery, local support, and UAH pricing with no surprises.',
    tone: 'orange',
    Icon: FmdGoodIcon,
  },
  {
    id: 5,
    valueLabel: 'VALUE 05',
    title: 'Secure Payments',
    text: 'All transactions are encrypted and processed through certified payment gateways. Your financial data is always protected.',
    tone: 'blue',
    Icon: CreditCardIcon,
  },
  {
    id: 6,
    valueLabel: 'VALUE 06',
    title: 'Continuous Growth',
    text: 'We constantly expand our catalog, improve delivery speeds, and train our team to offer you the best possible experience.',
    tone: 'purple',
    Icon: TrendingUpIcon,
  },
] as const;

export const AboutCoreValuesSection = () => {
  return (
    <section className="about-values" aria-label="Core Values Section">
      <Container disableGutters>
        <Typography className="about-values__eyebrow">WHAT WE STAND FOR</Typography>
        <Typography variant="h2" component="h2" className="about-values__title">
          Our Core Values
        </Typography>
        <Typography className="about-values__description">
          These principles guide every decision we make - from which products we list to how we
          handle customer support.
        </Typography>

        <div className="about-values__grid">
          {coreValues.map((value) => (
            <article key={value.id} className="about-values__card">
              <Typography component="p" className="about-values__index">
                {value.valueLabel}
              </Typography>
              <div className="about-values__icon-wrap">
                <div className={`about-values__icon about-values__icon--${value.tone}`}>
                  <value.Icon sx={{ fontSize: '26px' }} />
                </div>
              </div>
              <Typography component="h3" className="about-values__card-title">
                {value.title}
              </Typography>
              <Typography component="p" className="about-values__card-text">
                {value.text}
              </Typography>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
