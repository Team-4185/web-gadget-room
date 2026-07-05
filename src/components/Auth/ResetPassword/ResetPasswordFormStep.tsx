import { Typography } from '@mui/material';
import type { Control, UseFormHandleSubmit } from 'react-hook-form';

import { Button, FormInput } from '@/components';
import { PASSWORD_TOOLTIP } from '@/core/constants';
import type { FormResetPassword } from '@/core/schemas';

type ResetPasswordFormStepProps = {
  control: Control<FormResetPassword>;
  hasToken: boolean;
  isLoading: boolean;
  onSubmit: ReturnType<UseFormHandleSubmit<FormResetPassword>>;
};

export const ResetPasswordFormStep = ({
  control,
  hasToken,
  isLoading,
  onSubmit,
}: ResetPasswordFormStepProps) => (
  <form className="reset-password__form" onSubmit={onSubmit} noValidate>
    <FormInput
      type="password"
      name="newPassword"
      label="New password"
      tooltipText={PASSWORD_TOOLTIP}
      control={control}
      autoComplete="new-password"
      isPassword
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
      label="Confirm password"
      tooltipText={PASSWORD_TOOLTIP}
      control={control}
      autoComplete="new-password"
      isPassword
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
      Set New Password
    </Button>
  </form>
);
