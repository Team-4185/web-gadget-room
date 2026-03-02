import type { FC } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { Button, CheckBox, Input } from '@/components';
import { useLogin } from '@/core/hooks';
import { FADEUP } from '@/core/constants';

import './Login.css';

export const Login: FC = () => {
  // const navigate = useNavigate();
  // const { loginForm, setLoginForm, loginErrors, setLoginErrors, loginIssues, validateLogin } =
  //   useLoginForm();
  // const { login, loading: loginLoading, error: loginError } = useLogin();

  // const onLogin = async () => {
  //   if (!validateLogin()) return;
  //   try {
  //     await login(loginForm);
  //     navigate('/userProfile', { replace: true });
  //   } catch {}
  // };

  return (
    <motion.div variants={FADEUP} initial="hidden" animate="visible" className="login">
      <Typography sx={{ fontWeight: '600' }} component="h5" variant="h5">
        Login
      </Typography>
      <form className="login__form">
        <Input label="Email address" required />
        <Input label="Password" isPassword required sx={{ marginTop: '15px' }} />

        <div className="login__actions">
          <CheckBox
            id="remember"
            name="remember"
            label="Register"
            className="login__checkbox"
            checked
            onChange={() => console.log('checked')}
          />

          <Typography sx={{ fontWeight: 400, color: 'var(--black)' }}>Forgot Password?</Typography>
        </div>

        <Button maxWidth="549px" height="36" textTransform="uppercase" sx={{ marginTop: '32px' }}>
          Continue
        </Button>
      </form>
    </motion.div>
  );
};
