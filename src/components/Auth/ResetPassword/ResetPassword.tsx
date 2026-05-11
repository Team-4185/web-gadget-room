import type { FC } from 'react';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { PASSWORD_TOOLTIP, FADEUP, PASSWORD_RESET_STEPS } from '@/core/constants';
import { ChevronLeft } from '@/assets';
import { Button, FormInput, Stepper } from '@/components';

import './ResetPassword';

interface IProps {
  className?: string;
}

export const ResetPassword: FC<IProps> = ({ className }) => {
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <motion.div
      className={`${className} forgot-password`}
      variants={FADEUP}
      initial="hidden"
      animate="visible"
    >
      <Link
        component={RouterLink}
        to="/"
        sx={{
          width: 'max-content',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          color: 'var(--muted-violet)',
          letterSpacing: '-1px',
        }}
      >
        <ChevronLeft color="var(--muted-violet)" />
        Back to Login
      </Link>
      <div className="forgot-password__title">
        <Typography sx={{ fontWeight: '600', letterSpacing: '-1px' }} component="h5" variant="h5">
          Forgot Password?
        </Typography>
        <Typography
          sx={{
            marginTop: '10px',
            fontWeight: 600,
            fontSize: '16px',
            letterSpacing: '-1px',
            color: 'var(--muted-violet)',
          }}
        >
          <Typography
            component="span"
            sx={{
              fontWeight: 600,
              fontSize: '16px',
              color: 'var(--blue-violet)',
              letterSpacing: '-1px',
            }}
          >
            No worries!
          </Typography>{' '}
          Enter your email and we'll send you a reset link.
        </Typography>
        <Stepper
          mode="default"
          showStepConnector={true}
          steps={PASSWORD_RESET_STEPS}
          sx={{ gap: '8px', marginTop: '30px' }}
        />
      </div>
      <form className="forgot-password__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          type="password"
          name="newPassword"
          label="NEW PASSWORD"
          tooltipText={PASSWORD_TOOLTIP}
          control={control}
          autoComplete="email"
          required
        />

        <Typography
          sx={{
            marginTop: '12px',
            fontWeight: 600,
            fontSize: '12px',
            color: 'var(--muted-violet)',
            letterSpacing: '-1px',
          }}
        >
          Enter a password
        </Typography>

        <FormInput
          type="password"
          name="confirmPassword"
          label="CONFIRM PASSWORD"
          tooltipText={PASSWORD_TOOLTIP}
          control={control}
          autoComplete="email"
          required
        />

        <Button
          type="submit"
          maxWidth="549px"
          height="36px"
          textTransform="uppercase"
          sx={{ marginTop: '40px' }}
        >
          Sent Reset Link
        </Button>
      </form>
      <Typography
        sx={{
          marginTop: '25px',
          fontWeight: 600,
          letterSpacing: '-1px',
          textAlign: 'center',
          color: 'var(--muted-violet)',
        }}
      >
        Remember your password?{' '}
        <Link component={RouterLink} to="/" sx={{ color: 'var(--blue-violet)' }}>
          Log in
        </Link>
      </Typography>
    </motion.div>
  );
};
