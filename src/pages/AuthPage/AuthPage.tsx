import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { Login, Register, WelcomeSection } from '@/components';
import { ArrowRight, ArrowLeft } from '@/assets';

import './AuthPage.css';

export const AuthPage: FC = () => {
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <section className="auth">
      <Container disableGutters>
        <div className="auth__wrapper">
          <motion.div
            className="auth__switcher"
            initial={currentUrl === '/register' ? { left: 0 } : { right: 0 }}
            animate={
              currentUrl === '/register' ? { right: 'unset', left: 0 } : { right: 0, left: 'unset' }
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />

          {currentUrl !== '/register' ? (
            <>
              <Login />
              <WelcomeSection
                title="Welcome back"
                subtitle="Please login to continue"
                icon={ArrowLeft}
              />
            </>
          ) : (
            <>
              <WelcomeSection
                title="Nice to meet you"
                subtitle="Just register to join with us"
                icon={ArrowRight}
              />
              <Register />
            </>
          )}
        </div>
      </Container>
    </section>
  );
};
