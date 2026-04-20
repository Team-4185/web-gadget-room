import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@mui/material';
import { useLocation } from 'react-router';

import { ForgotPassword, Login, Register, WelcomeSection } from '@/components';
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
            className={`auth__switcher ${currentUrl === '/' || currentUrl === '/register' ? 'auth__switcher--primary' : 'auth__switcher--secondary'}`}
            initial={currentUrl === '/register' ? { left: 0 } : { right: 0 }}
            animate={
              currentUrl === '/register' ? { right: 'unset', left: 0 } : { right: 0, left: 'unset' }
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />

          {currentUrl === '/' && (
            <>
              <Login className="auth__form auth__form--login" />
              <WelcomeSection
                title="Welcome back"
                subtitle="Please login to continue"
                icon={ArrowLeft}
                className="auth__content--login"
                svgClassName="auth__media--login"
              />
            </>
          )}

          {currentUrl === '/register' && (
            <>
              <WelcomeSection
                title="Nice to meet you"
                subtitle="Just register to join with us"
                icon={ArrowRight}
                className="auth__content--register"
                svgClassName="auth__media--register"
              />
              <Register className="auth__form auth__form--register" />
            </>
          )}

          {currentUrl === '/forgot-password' && (
            <>
              <ForgotPassword className="auth__form auth__form--forgot-password" />
              <WelcomeSection
                title="Reset your password"
                subtitle="Enter your email to receive a secure password reset link."
                icon={ArrowLeft}
                className="auth__content--forgot-password"
              />
            </>
          )}
        </div>
      </Container>
    </section>
  );
};
