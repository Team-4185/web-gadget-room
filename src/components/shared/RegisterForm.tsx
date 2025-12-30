import type { FC } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useRegisterForm } from '../../core/hooks/useRegisterForm';
import { Input } from '../ui/Input/Input';
import { useRegister } from '../../core/hooks/auth/useRegister';

export const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const { regForm, setRegForm, regErrors, setRegErrors, regIssues, validateRegister } =
    useRegisterForm();
  const { register, loading: regLoading, error: regError } = useRegister();

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

  const regDisabled = regLoading || regIssues.length > 0;

  return (
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
          {regErrors.email && <span style={{ color: 'crimson' }}>{regErrors.email}</span>}

          <Input
            type="password"
            label="Password"
            value={regForm.password}
            onChange={(e: any) => {
              const v = e.target.value;
              setRegForm((s) => ({ ...s, password: v }));
              if (regErrors.password) setRegErrors((s) => ({ ...s, password: undefined }));
            }}
          />
          {regErrors.password && <span style={{ color: 'crimson' }}>{regErrors.password}</span>}

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
                if (regErrors.accept) setRegErrors((s) => ({ ...s, accept: undefined }));
              }}
              style={{ width: '18px', height: '18px', accentColor: 'black' }}
            />
            <Box style={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.65)' }}>
              <Box>I have read and accept the Terms of</Box>
              <Box>Service & Privacy Policy *</Box>
            </Box>
          </Box>
          {regErrors.accept && <span style={{ color: 'crimson' }}>{regErrors.accept}</span>}

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
              {regError && <div style={{ marginTop: regIssues.length ? 8 : 0 }}>{regError}</div>}
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
  );
};
