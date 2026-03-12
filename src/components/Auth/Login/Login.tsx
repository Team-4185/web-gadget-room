import { useEffect, type FC } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';

import { Button, FormCheckbox, FormInput } from '@/components';
import { EMAIL_TOOLTIP, FADEUP, PASSWORD_TOOLTIP } from '@/core/constants';
import { type FormLoginValues, loginSchema } from '@/core/schemas';
import { authActions, useAppDispatch } from '@/core/store';

import './Login.css';

export const Login: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { control, handleSubmit, reset, formState } = useForm<FormLoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      // remember: false,
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const onSubmit: SubmitHandler<FormLoginValues> = async (data) => {
    const resultAction = await dispatch(authActions.login(data));

    if (authActions.login.fulfilled.match(resultAction)) {
      navigate('/home', { replace: true });
    } else {
      if (resultAction.payload) {
        enqueueSnackbar(resultAction.payload.detail, { variant: 'error' });
      } else {
        enqueueSnackbar(resultAction.error.message, { variant: 'error' });
      }
    }
  };

  return (
    <motion.div className="login" variants={FADEUP} initial="hidden" animate="visible">
      <Typography sx={{ fontWeight: '600' }} component="h5" variant="h5">
        Login
      </Typography>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          type="email"
          name="email"
          label="Email Address"
          tooltipText={EMAIL_TOOLTIP}
          control={control}
          autoComplete="email"
          required
        />
        <FormInput
          name="password"
          label="Password"
          tooltipText={PASSWORD_TOOLTIP}
          control={control}
          autoComplete="current-password"
          isPassword
          required
          sx={{ marginTop: '15px' }}
        />

        <div className="login__actions">
          {/* <FormCheckbox id="remember" name="remember" control={control} label="Remember" /> */}

          <Typography sx={{ fontWeight: 400, color: 'var(--black)' }}>Forgot Password?</Typography>
        </div>

        <Button
          type="submit"
          maxWidth="549px"
          height="36"
          textTransform="uppercase"
          sx={{ marginTop: '32px' }}
        >
          Continue
        </Button>
      </form>
    </motion.div>
  );
};
