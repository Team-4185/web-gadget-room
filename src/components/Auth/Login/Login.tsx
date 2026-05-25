import { useEffect, type FC } from 'react';
import { Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';

import { Button, FormCheckbox, FormInput } from '@/components';
import { FADEUP, PASSWORD_TOOLTIP } from '@/core/constants';
import { type FormLoginValues, loginSchema } from '@/core/schemas';
import { authActions, useAppDispatch } from '@/core/store';

import './Login.css';

interface IProps {
  className?: string;
}

export const Login: FC<IProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { control, handleSubmit, reset, formState } = useForm<FormLoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
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
    <motion.div
      className={`${className} login`}
      variants={FADEUP}
      initial="hidden"
      animate="visible"
    >
      <Typography sx={{ fontWeight: '600' }} component="h5" variant="h5">
        Login
      </Typography>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          type="email"
          name="email"
          label="Email Address"
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
          <FormCheckbox id="remember" name="rememberMe" control={control} label="Remember" />

          <Link
            component={RouterLink}
            to="/forgot-password"
            sx={{ fontWeight: 400, color: 'var(--black)' }}
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          maxWidth="549px"
          height="36px"
          textTransform="uppercase"
          sx={{ marginTop: '32px' }}
        >
          Continue
        </Button>
      </form>
    </motion.div>
  );
};
