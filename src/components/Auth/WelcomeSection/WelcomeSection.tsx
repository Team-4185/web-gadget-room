import type { FC, SVGProps } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router';

import { FADEUP } from '@/core/constants';

import './WelcomeSection.css';

interface IProps {
  title: string;
  subtitle: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  className?: string;
  svgClassName?: string;
}

export const WelcomeSection: FC<IProps> = ({
  title,
  subtitle,
  icon: Icon,
  className = '',
  svgClassName = '',
}) => {
  const location = useLocation();

  const isRegister = location.pathname === '/register';
  const isLogin = location.pathname === '/';

  return (
    <motion.div className="auth__welcome" variants={FADEUP} initial="hidden" animate="visible">
      <div className={`auth__content ${className}`}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: '800',
            color: 'var(--black)',
            lineHeight: '56px',
            letterSpacing: !isRegister && !isLogin ? '-4px' : '-3px',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontWeight: '500',
            fontSize: '24px',
            color: 'var(--black)',
            lineHeight: !isRegister && !isLogin ? '36px' : '56px',
            marginTop: !isRegister && !isLogin ? '25px' : '8px',
          }}
        >
          {subtitle}
        </Typography>
      </div>

      {(isRegister || isLogin) && (
        <Icon width={112} height={103} className={`auth__media ${svgClassName}`} />
      )}
    </motion.div>
  );
};
