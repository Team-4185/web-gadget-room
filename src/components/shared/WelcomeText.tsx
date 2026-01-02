import type { FC } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface IProps {
  title: string;
  subtitle: string;
  arrow: string;
}

export const WelcomeText: FC<IProps> = ({ title, subtitle, arrow }) => {
  return (
    <motion.div
      key="welcomeText"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%', padding: '0 80px' }}
    >
      <Box sx={{ maxWidth: '480px' }}>
        <span
          style={{
            fontWeight: '700',
            fontSize: '56px',
            color: '#000',
            display: 'block',
            marginBottom: '20px',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontWeight: '500',
            fontSize: '24px',
            color: '#000',
            display: 'block',
            marginBottom: '30px',
          }}
        >
          {subtitle}
        </span>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <img src={arrow} alt="arrow" />
        </Box>
      </Box>
    </motion.div>
  );
};
