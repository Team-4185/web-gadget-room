import { Typography } from '@mui/material';

import { SuccessConfirmation } from '@/assets';
import { Button, Stepper } from '@/components';
import { PASSWORD_RESET_STEPS } from '@/core/constants';

type ForgotPasswordInboxStepProps = {
  sentEmail: string;
  onBackToLogin: () => void;
  onResend: () => void;
};

export const ForgotPasswordInboxStep = ({
  sentEmail,
  onBackToLogin,
  onResend,
}: ForgotPasswordInboxStepProps) => (
  <div className="forgot-password__sent">
    <div className="forgot-password__sent-header">
      <div>
        <Typography sx={{ fontWeight: 600, letterSpacing: '-1px' }} component="h5" variant="h5">
          Check your inbox!
        </Typography>
        <Typography
          sx={{
            marginTop: '10px',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: 1.2,
            letterSpacing: '-1px',
            color: 'var(--muted-violet)',
          }}
        >
          We&apos;ve sent a password reset link to{' '}
          <Typography
            component="span"
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--blue-violet)',
              letterSpacing: '-1px',
            }}
          >
            {sentEmail}
          </Typography>
          .
        </Typography>
      </div>
      <SuccessConfirmation className="forgot-password__sent-icon" />
    </div>

    <Stepper
      mode="default"
      showStepConnector={true}
      steps={PASSWORD_RESET_STEPS}
      activeStep={0}
      sx={{ gap: '8px', marginTop: '24px' }}
    />

    <Typography
      sx={{
        marginTop: '30px',
        fontWeight: 600,
        fontSize: '13px',
        color: 'var(--muted-violet)',
        letterSpacing: '-1px',
      }}
    >
      The link will expire in 30 minutes.
    </Typography>

    <Button
      type="button"
      maxWidth="549px"
      height="36px"
      textTransform="uppercase"
      sx={{ marginTop: '52px' }}
      onClick={onBackToLogin}
    >
      Back To Login
    </Button>

    <Typography
      sx={{
        marginTop: '22px',
        fontWeight: 600,
        letterSpacing: '-1px',
        textAlign: 'center',
        color: 'var(--muted-violet)',
      }}
    >
      Didn&apos;t receive an email?{' '}
      <button type="button" className="forgot-password__resend" onClick={onResend}>
        Resend
      </button>
    </Typography>
  </div>
);
