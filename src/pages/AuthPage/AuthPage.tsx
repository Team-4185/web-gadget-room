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
            initial={currentUrl === '/login' ? { right: 0 } : { left: 0 }}
            animate={
              currentUrl === '/login' ? { right: 0, left: 'unset' } : { right: 'unset', left: 0 }
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />

          {currentUrl !== '/login' ? (
            <>
              <WelcomeSection
                title="Nice to meet you"
                subtitle="Just register to join with us"
                icon={ArrowRight}
              />
              <Register />
            </>
          ) : (
            <>
              <Login />
              <WelcomeSection
                title="Welcome back"
                subtitle="Please login to continue"
                icon={ArrowLeft}
              />
            </>
          )}

          {/* <AuthPanel>
            <AnimatePresence mode="wait">
              {currentUrl !== '/login' ? (
                <Register />
              ) : (
                <WelcomeText
                  title="Welcome back"
                  subtitle="Please login to continue"
                  icon={ArrowLeft}
                />
              )}
            </AnimatePresence>
          </AuthPanel> */}
        </div>
      </Container>
    </section>
  );
};
