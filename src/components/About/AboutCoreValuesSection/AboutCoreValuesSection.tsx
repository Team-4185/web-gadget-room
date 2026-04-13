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
        <div className="about-values__eyebrow-wrap">
          <Typography sx={{ fontSize: '24px', fontWeight: 600, lineHeight: '26px', color: '#525f7c', letterSpacing: '-2px' }}>
            WHAT WE STAND FOR
          </Typography>
        </div>
        <div className="about-values__title-wrap">
          <Typography variant="h2" component="h2" sx={{ color: '#2d2d2d', fontSize: '56px', lineHeight: '56px', letterSpacing: '-2px', fontWeight: 700 }}>
            Our Core Values
          </Typography>
        </div>
        <div className="about-values__description-wrap">
          <Typography sx={{ color: '#8f8faf', fontSize: '24px', lineHeight: '26px', letterSpacing: '-1px' }}>
            These principles guide every decision we make - from which products we list to how we
            handle customer support.
          </Typography>
        </div>

        <div className="about-values__grid">
          {coreValues.map((value) => (
            <article key={value.id} className="about-values__card">
              <Typography component="p" sx={{ color: '#7c7c97', fontSize: '15px', lineHeight: '20px', textTransform: 'uppercase' }}>
                {value.valueLabel}
              </Typography>
              <div className="about-values__icon-wrap">
                <div className={`about-values__icon about-values__icon--${value.tone}`}>
                  <value.Icon sx={{ fontSize: '26px' }} />
                </div>
              </div>
              <div className="about-values__card-title-wrap">
                <Typography component="h3" sx={{ fontSize: '32px', lineHeight: '32px', color: '#252537', fontWeight: 700, letterSpacing: '-1px' }}>
                  {value.title}
                </Typography>
              </div>
              <div className="about-values__card-text-wrap">
                <Typography component="p" sx={{ fontSize: '24px', lineHeight: '34px', color: '#8888a8', letterSpacing: '-1px' }}>
                  {value.text}
                </Typography>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
