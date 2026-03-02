import type { FC, SVGProps } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { FADEUP } from '@/core/constants/animations';

import Mobile from '/registerMobile.png';

import './WelcomeSection.css';

interface IProps {
  title: string;
  subtitle: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export const WelcomeSection: FC<IProps> = ({ title, subtitle, icon: Icon }) => {
  return (
    <motion.div className="auth__welcome" variants={FADEUP} initial="hidden" animate="visible">
      <div className="auth__content">
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: '800',
            color: 'var(--black)',
            lineHeight: '56px',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontWeight: '500',
            fontSize: '24px',
            color: 'var(--black)',
            lineHeight: '56px',
            marginTop: '8px',
          }}
        >
          {subtitle}
        </Typography>
      </div>
      <div className="auth__media">
        <img src={Mobile} width={323} height={289} alt="Mobile" />
        <Icon width={156} height={142} />
      </div>
    </motion.div>
  );
};
