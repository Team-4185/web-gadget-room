import type { FC } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { Input } from '@/components';
import { useLogin, useLoginForm } from '@/core/hooks';

export const Login: FC = () => {
  const navigate = useNavigate();
  const { loginForm, setLoginForm, loginErrors, setLoginErrors, loginIssues, validateLogin } =
    useLoginForm();
  const { login, loading: loginLoading, error: loginError } = useLogin();

  const onLogin = async () => {
    if (!validateLogin()) return;
    try {
      await login(loginForm);
      navigate('/userProfile', { replace: true });
    } catch {}
  };

  const loginDisabled = loginLoading || loginIssues.length > 0;

  return (
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
              if (loginErrors.email) setLoginErrors((s) => ({ ...s, email: undefined }));
            }}
          />
          {loginErrors.email && <span style={{ color: 'crimson' }}>{loginErrors.email}</span>}

          <Input
            type="password"
            label="Password"
            value={loginForm.password}
            onChange={(e: any) => {
              const v = e.target.value;
              setLoginForm((s) => ({ ...s, password: v }));
              if (loginErrors.password) setLoginErrors((s) => ({ ...s, password: undefined }));
            }}
          />
          {loginErrors.password && <span style={{ color: 'crimson' }}>{loginErrors.password}</span>}
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
                <div style={{ marginTop: loginIssues.length ? 8 : 0 }}>{loginError}</div>
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
  );
};
