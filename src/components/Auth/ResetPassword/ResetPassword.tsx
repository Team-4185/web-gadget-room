import type { FC } from 'react';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router';
import { motion } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';

import { PASSWORD_TOOLTIP, FADEUP, PASSWORD_RESET_STEPS } from '@/core/constants';
import { ChevronLeft } from '@/assets';
import { Button, FormInput, Stepper } from '@/components';
import { resetPasswordSchema, type FormResetPassword } from '@/core/schemas';
import { authActions, useAppDispatch, useAppSelector } from '@/core/store';

import './ResetPassword.css';

interface IProps {
  className?: string;
}

export const ResetPassword: FC<IProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const isLoading = useAppSelector((state) => state.auth.loading);
  const token = searchParams.get('token') ?? '';
  const hasToken = Boolean(token);

  const { control, handleSubmit } = useForm<FormResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FormResetPassword> = async ({ newPassword }) => {
    if (!hasToken) {
      enqueueSnackbar('Password reset link is missing or invalid.', { variant: 'error' });
      return;
    }

    const resultAction = await dispatch(authActions.resetPassword({ token, newPassword }));

    if (authActions.resetPassword.fulfilled.match(resultAction)) {
      enqueueSnackbar('Password has been reset. Please log in with your new password.', {
        variant: 'success',
      });
      navigate('/login', { replace: true });
      return;
    }

    if (resultAction.payload) {
      enqueueSnackbar(resultAction.payload.detail, { variant: 'error' });
    } else {
      enqueueSnackbar(resultAction.error.message, { variant: 'error' });
    }
  };

  return (
    <motion.div
      className={`${className} reset-password`}
      variants={FADEUP}
      initial="hidden"
      animate="visible"
    >
      <Link
        component={RouterLink}
        to="/login"
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

      <div className="reset-password__title">
        <Typography sx={{ fontWeight: '600', letterSpacing: '-1px' }} component="h5" variant="h5">
          Reset Password
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
            Almost done!
          </Typography>{' '}
          Create a new password for your account.
        </Typography>
        <Stepper
          mode="default"
          showStepConnector={true}
          steps={PASSWORD_RESET_STEPS}
          sx={{ gap: '8px', marginTop: '30px' }}
        />
      </div>

      <form className="reset-password__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          type="password"
          name="newPassword"
          label="NEW PASSWORD"
          tooltipText={PASSWORD_TOOLTIP}
          control={control}
          autoComplete="new-password"
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
          Use at least 8 characters, including uppercase, lowercase, number, and special symbol.
        </Typography>

        <FormInput
          type="password"
          name="confirmPassword"
          label="CONFIRM PASSWORD"
          tooltipText={PASSWORD_TOOLTIP}
          control={control}
          autoComplete="new-password"
          required
        />

        {!hasToken ? (
          <Typography
            sx={{
              marginTop: '12px',
              fontWeight: 600,
              fontSize: '12px',
              color: 'var(--coralRed)',
              letterSpacing: '-1px',
            }}
          >
            Password reset link is missing or invalid.
          </Typography>
        ) : null}

        <Button
          type="submit"
          maxWidth="549px"
          height="36px"
          textTransform="uppercase"
          sx={{ marginTop: '40px' }}
          disabled={!hasToken || isLoading}
        >
          Reset Password
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
        <Link component={RouterLink} to="/login" sx={{ color: 'var(--blue-violet)' }}>
          Log in
        </Link>
      </Typography>
    </motion.div>
  );
};
