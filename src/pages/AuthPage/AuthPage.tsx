import { motion, AnimatePresence } from 'framer-motion';
import { Container, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import ArrowRight from '/icons/ArrowRight.svg';
import ArrowLeft from '/icons/ArrowLeft.svg';
import { useEffect, useState } from 'react';
import { useLogin } from '../../core/hooks/auth/useLogin';
import { useRegister } from '../../core/hooks/auth/useRegister';
import { Input } from '../../components/ui/Input/Input';

// validator.js
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import isLength from 'validator/lib/isLength';

export const AuthPage = () => {
  const location = useLocation();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if ((location as any).state?.mode) setMode((location as any).state.mode);
  }, [location]);

  const navigate = useNavigate();
  const { login, loading: loginLoading, error: loginError } = useLogin();
  const { register, loading: regLoading, error: regError } = useRegister();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    accept: false,
  });

  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});
  const [regErrors, setRegErrors] = useState<{
    email?: string;
    password?: string;
    passwordConfirmation?: string;
    accept?: string;
  }>({});

  const pwdRules = { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };

  const getLoginIssues = (form: { email: string; password: string }) => {
    const issues: string[] = [];
    if (!isEmail(form.email)) issues.push('Enter a valid email address');
    if (!isLength(form.password, { min: 8 })) issues.push('Min 8 characters');
    return issues;
  };

  const getRegisterIssues = (form: {
    email: string;
    password: string;
    passwordConfirmation: string;
    accept: boolean;
  }) => {
    const issues: string[] = [];
    if (!isEmail(form.email)) issues.push('Enter a valid email address');
    if (!isStrongPassword(form.password, pwdRules))
      issues.push('Min 8 chars, 1 lower, 1 upper, 1 number, 1 symbol');
    if (form.password !== form.passwordConfirmation) issues.push('Passwords do not match');
    if (!form.accept) issues.push('Accept Terms to continue');
    return issues;
  };

  const loginIssues = getLoginIssues(loginForm);
  const regIssues = getRegisterIssues(regForm);

  const validateLogin = () => {
    const errs: typeof loginErrors = {};
    if (!isEmail(loginForm.email)) errs.email = 'Enter a valid email address';
    if (!isLength(loginForm.password, { min: 8 })) errs.password = 'Min 8 characters';
    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateRegister = () => {
    const errs: typeof regErrors = {};
    if (!isEmail(regForm.email)) errs.email = 'Enter a valid email address';
    if (!isStrongPassword(regForm.password, pwdRules))
      errs.password = 'Min 8 chars, 1 lower, 1 upper, 1 number, 1 symbol';
    if (regForm.password !== regForm.passwordConfirmation)
      errs.passwordConfirmation = 'Passwords do not match';
    if (!regForm.accept) errs.accept = 'Accept Terms to continue';
    setRegErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onLogin = async () => {
    if (!validateLogin()) return;
    try {
      await login(loginForm);
      navigate('/userProfile', { replace: true });
    } catch {}
  };

  const onRegister = async () => {
    if (!validateRegister()) return;
    try {
      await register({
        email: regForm.email,
        password: regForm.password,
        passwordConfirmation: regForm.passwordConfirmation,
      });
      navigate('/userProfile', { replace: true });
    } catch {}
  };

  const loginDisabled = loginLoading || loginIssues.length > 0;
  const regDisabled = regLoading || regIssues.length > 0;

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
          <Box sx={{ position: 'relative', width: '50%', zIndex: 1 }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 40px',
                minHeight: '800px',
              }}
            >
              <AnimatePresence mode="wait">
                {mode !== 'login' ? (
                  <motion.div
                    key="registerForm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%', maxWidth: '480px' }}
                  >
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontWeight: '600',
                          fontSize: '36px',
                          color: '#000',
                          marginBottom: '35px',
                        }}
                      >
                        Register
                      </span>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Input
                          type="email"
                          label="Email Address"
                          value={regForm.email}
                          onChange={(e: any) => {
                            const v = e.target.value;
                            setRegForm((s) => ({ ...s, email: v }));
                            if (regErrors.email) setRegErrors((s) => ({ ...s, email: undefined }));
                          }}
                        />
                        {regErrors.email && (
                          <span style={{ color: 'crimson' }}>{regErrors.email}</span>
                        )}

                        <Input
                          type="password"
                          label="Password"
                          value={regForm.password}
                          onChange={(e: any) => {
                            const v = e.target.value;
                            setRegForm((s) => ({ ...s, password: v }));
                            if (regErrors.password)
                              setRegErrors((s) => ({ ...s, password: undefined }));
                          }}
                        />
                        {regErrors.password && (
                          <span style={{ color: 'crimson' }}>{regErrors.password}</span>
                        )}

                        <Input
                          type="password"
                          label="Repeat Password"
                          value={regForm.passwordConfirmation}
                          onChange={(e: any) => {
                            const v = e.target.value;
                            setRegForm((s) => ({ ...s, passwordConfirmation: v }));
                            if (regErrors.passwordConfirmation)
                              setRegErrors((s) => ({
                                ...s,
                                passwordConfirmation: undefined,
                              }));
                          }}
                        />
                        {regErrors.passwordConfirmation && (
                          <span style={{ color: 'crimson' }}>{regErrors.passwordConfirmation}</span>
                        )}
                      </Box>
                      <Box
                        sx={{
                          marginTop: '30px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <input
                            type="checkbox"
                            id="terms"
                            checked={regForm.accept}
                            onChange={(e) => {
                              const checked = e.currentTarget.checked;
                              setRegForm((v) => ({ ...v, accept: checked }));
                              if (regErrors.accept)
                                setRegErrors((s) => ({ ...s, accept: undefined }));
                            }}
                            style={{ width: '18px', height: '18px', accentColor: 'black' }}
                          />
                          <Box style={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.65)' }}>
                            <Box>I have read and accept the Terms of</Box>
                            <Box>Service & Privacy Policy *</Box>
                          </Box>
                        </Box>
                        {regErrors.accept && (
                          <span style={{ color: 'crimson' }}>{regErrors.accept}</span>
                        )}

                        {(regIssues.length > 0 || regError) && (
                          <Box
                            role="alert"
                            aria-live="polite"
                            sx={{ color: 'crimson', fontSize: '14px', mt: '4px' }}
                          >
                            {regIssues.length > 0 && (
                              <ul style={{ margin: 0, paddingLeft: '18px' }}>
                                {Array.from(new Set(regIssues)).map((msg) => (
                                  <li key={msg}>{msg}</li>
                                ))}
                              </ul>
                            )}
                            {regError && (
                              <div style={{ marginTop: regIssues.length ? 8 : 0 }}>{regError}</div>
                            )}
                          </Box>
                        )}

                        <button
                          disabled={regDisabled}
                          style={{
                            width: '100%',
                            marginTop: '8px',
                            height: '36px',
                            background: '#fff',
                            fontWeight: '600',
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            color: '#000',
                            border: 'none',
                            cursor: regDisabled ? 'not-allowed' : 'pointer',
                            borderRadius: '8px',
                            opacity: regLoading ? 0.6 : 1,
                          }}
                          onClick={onRegister}
                        >
                          {regLoading ? 'Processing…' : 'Continue'}
                        </button>
                      </Box>
                    </Box>
                  </motion.div>
                ) : (
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
                        Welcome back
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
                        Please login to continue
                      </span>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <img src={ArrowRight} alt="" />
                      </Box>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Box>

          <Box sx={{ position: 'relative', width: '50%', zIndex: 1 }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 40px',
                boxSizing: 'border-box',
                minHeight: '800px',
              }}
            >
              <AnimatePresence mode="wait">
                {mode !== 'login' ? (
                  <motion.div
                    key="niceText"
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
                        Nice to meet you)
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
                        Just register to join with us
                      </span>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <img src={ArrowLeft} alt="" />
                      </Box>
                    </Box>
                  </motion.div>
                ) : (
                  <motion.div
                    key="loginForm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%', maxWidth: '480px' }}
                  >
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontWeight: '600',
                          fontSize: '36px',
                          color: '#000',
                          marginBottom: '35px',
                        }}
                      >
                        Login
                      </span>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <Input
                          type="email"
                          label="Email Address"
                          value={loginForm.email}
                          onChange={(e: any) => {
                            const v = e.target.value;
                            setLoginForm((s) => ({ ...s, email: v }));
                            if (loginErrors.email)
                              setLoginErrors((s) => ({ ...s, email: undefined }));
                          }}
                        />
                        {loginErrors.email && (
                          <span style={{ color: 'crimson' }}>{loginErrors.email}</span>
                        )}

                        <Input
                          type="password"
                          label="Password"
                          value={loginForm.password}
                          onChange={(e: any) => {
                            const v = e.target.value;
                            setLoginForm((s) => ({ ...s, password: v }));
                            if (loginErrors.password)
                              setLoginErrors((s) => ({ ...s, password: undefined }));
                          }}
                        />
                        {loginErrors.password && (
                          <span style={{ color: 'crimson' }}>{loginErrors.password}</span>
                        )}
                      </Box>
                      <Box
                        sx={{
                          marginTop: '25px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '15px',
                        }}
                      >
                        {(loginIssues.length > 0 || loginError) && (
                          <Box
                            role="alert"
                            aria-live="polite"
                            sx={{ color: 'crimson', fontSize: '14px', mt: '4px' }}
                          >
                            {loginIssues.length > 0 && (
                              <ul style={{ margin: 0, paddingLeft: '18px' }}>
                                {Array.from(new Set(loginIssues)).map((msg) => (
                                  <li key={msg}>{msg}</li>
                                ))}
                              </ul>
                            )}
                            {loginError && (
                              <div style={{ marginTop: loginIssues.length ? 8 : 0 }}>
                                {loginError}
                              </div>
                            )}
                          </Box>
                        )}

                        <button
                          disabled={loginDisabled}
                          style={{
                            width: '100%',
                            marginTop: '8px',
                            height: '36px',
                            background: '#fff',
                            fontWeight: '600',
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            color: '#000',
                            border: 'none',
                            cursor: loginDisabled ? 'not-allowed' : 'pointer',
                            borderRadius: '8px',
                            opacity: loginLoading ? 0.6 : 1,
                          }}
                          onClick={onLogin}
                        >
                          {loginLoading ? 'Processing…' : 'Continue'}
                        </button>
                      </Box>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
