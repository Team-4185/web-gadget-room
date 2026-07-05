import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import type { Control, UseFormHandleSubmit } from 'react-hook-form';

import { Button, FormInput, Stepper } from '@/components';
import { PASSWORD_RESET_STEPS } from '@/core/constants';
import type { FormForgotPassword } from '@/core/schemas';

type ForgotPasswordEmailStepProps = {
  control: Control<FormForgotPassword>;
  onSubmit: ReturnType<UseFormHandleSubmit<FormForgotPassword>>;
};

export const ForgotPasswordEmailStep = ({ control, onSubmit }: ForgotPasswordEmailStepProps) => (
  <>
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
        activeStep={0}
        sx={{ gap: '8px', marginTop: '30px' }}
      />
    </div>
    <form className="forgot-password__form" onSubmit={onSubmit} noValidate>
      <FormInput
        type="email"
        name="email"
        label="Email Address"
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
        We'll send a password reset link to this email address.
      </Typography>

      <Button
        type="submit"
        maxWidth="549px"
        height="36px"
        textTransform="uppercase"
        sx={{ marginTop: '40px' }}
      >
        Send Reset Link
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
  </>
);
