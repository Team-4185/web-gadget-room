import { type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <motion.div
          className="auth__switcher"
          animate={{ left: currentUrl !== '/login' ? '0%' : '50%' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className="auth__wrapper">
          <AnimatePresence mode="wait">
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
          </AnimatePresence>

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
