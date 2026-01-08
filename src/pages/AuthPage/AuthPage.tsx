import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import ArrowRight from '/icons/ArrowRight.svg';
import ArrowLeft from '/icons/ArrowLeft.svg';
import { AuthPanel, LoginForm, RegisterForm, WelcomeText } from '@/components';

export const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const location = useLocation();

  useEffect(() => {
    if ((location as any).state?.mode) setMode((location as any).state.mode);
  }, [location]);

  return (
    <Container maxWidth="xl" disableGutters sx={{ padding: '60px 0' }}>
      <Box sx={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
        <Box
          sx={{
            display: 'flex',
            minHeight: '800px',
            background: '#fff',
            borderRadius: '50px',
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              width: '50%',
              height: '100%',
              background: 'rgba(151, 151, 151, 0.13)',
              borderRadius: '50px',
            }}
            animate={{ left: mode !== 'login' ? '0%' : '50%' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />

          <AuthPanel>
            <AnimatePresence mode="wait">
              {mode !== 'login' ? (
                <RegisterForm />
              ) : (
                <WelcomeText
                  title="Welcome back"
                  subtitle="Please login to continue"
                  arrow={ArrowRight}
                />
              )}
            </AnimatePresence>
          </AuthPanel>

          <AuthPanel>
            <AnimatePresence mode="wait">
              {mode !== 'login' ? (
                <WelcomeText
                  title="Nice to meet you)"
                  subtitle="Just register to join with us"
                  arrow={ArrowLeft}
                />
              ) : (
                <LoginForm />
              )}
            </AnimatePresence>
          </AuthPanel>
        </Box>
      </Box>
    </Container>
  );
};
