import type { FC } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { Input, CheckBox, Button } from '@/components';
import { FADEUP } from '@/core/constants/animations';
// import { useRegister } from '@/core/hooks';

import './Register.css';

export const Register: FC = () => {
  const navigate = useNavigate();
  // const { regForm, setRegForm, regErrors, setRegErrors, regIssues, validateRegister } =
  //   useRegisterForm();
  // const { register, loading: regLoading, error: regError } = useRegister();

  const onSubmit = () => {
    // if (!validateRegister()) return;
    // try {
    //   await register({
    //     email: regForm.email,
    //     password: regForm.password,
    //     passwordConfirmation: regForm.passwordConfirmation,
    //   });
    //   navigate('/userProfile', { replace: true });
    // } catch {}
  };

  return (
    <motion.div className="register" variants={FADEUP} initial="hidden" animate="visible">
      <Typography sx={{ fontWeight: '600' }} component="h5" variant="h5">
        Register
      </Typography>
      <form className="register__form" action="#" onSubmit={onSubmit}>
        <Input type="email" label="Email address" required />
        <Input label="Password" isPassword required sx={{ marginTop: '15px' }} />
        <Input label="Repeat Password" isPassword required sx={{ marginTop: '15px' }} />

        <CheckBox
          className="register__checkbox"
          id="terms"
          name="term"
          label={
            <>
              I have read and accept the{' '}
              <Typography sx={{ color: 'var(--blue-violet)' }} component="span">
                Terms of <br /> Service & Privacy Policy *
              </Typography>
            </>
          }
          checked={true}
          onChange={() => console.log('checked')}
        />

        <Button maxWidth="549px" height="36" textTransform="uppercase" sx={{ marginTop: '32px' }}>
          Continue
        </Button>
      </form>
    </motion.div>
  );
};
