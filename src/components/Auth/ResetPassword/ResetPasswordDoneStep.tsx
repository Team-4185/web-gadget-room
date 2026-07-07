import { Typography } from '@mui/material';

import { Button } from '@/components';

type ResetPasswordDoneStepProps = {
  onBackToLogin: () => void;
};

export const ResetPasswordDoneStep = ({ onBackToLogin }: ResetPasswordDoneStepProps) => (
  <div className="reset-password__done">
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: '14px',
        color: 'var(--muted-violet)',
        letterSpacing: '-1px',
      }}
    >
      You can now log in with your new password.
    </Typography>
    <Button
      type="button"
      maxWidth="549px"
      height="36px"
      textTransform="uppercase"
      sx={{ marginTop: '40px' }}
      onClick={onBackToLogin}
    >
      Back to Login
    </Button>
  </div>
);
