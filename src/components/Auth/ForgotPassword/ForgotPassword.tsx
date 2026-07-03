import { useEffect, useState, type FC } from 'react';
import { Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';

import { Button, FormInput, Stepper } from '@/components';
import { FADEUP, PASSWORD_RESET_STEPS } from '@/core/constants';
import { type FormForgotPassword, forgotPasswordSchema } from '@/core/schemas';
import { authActions, useAppDispatch } from '@/core/store';
import { ChevronLeft, SuccessConfirmation } from '@/assets';

import './ForgotPassword.css';

interface IProps {
  className?: string;
}

export const ForgotPassword: FC<IProps> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const { control, handleSubmit, formState, reset } = useForm<FormForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const onSubmit: SubmitHandler<FormForgotPassword> = async (data) => {
    const resultAction = await dispatch(authActions.forgotPassword(data));

    if (authActions.forgotPassword.fulfilled.match(resultAction)) {
      setSentEmail(data.email);
      setIsLinkSent(true);
      enqueueSnackbar('A password reset link has been sent to your email.', { variant: 'success' });
    } else {
      if (resultAction.payload) {
        enqueueSnackbar(resultAction.payload.detail, { variant: 'error' });
      } else {
        enqueueSnackbar(resultAction.error.message, { variant: 'error' });
      }
    }
  };

  const handleResend = async () => {
    if (!sentEmail) return;

    await onSubmit({ email: sentEmail });
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
      {isLinkSent ? (
        <div className="forgot-password__sent">
          <div className="forgot-password__sent-header">
            <div>
              <Typography
                sx={{ fontWeight: 600, letterSpacing: '-1px' }}
                component="h5"
                variant="h5"
              >
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
            onClick={() => navigate('/')}
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
            <button type="button" className="forgot-password__resend" onClick={handleResend}>
              Resend
            </button>
          </Typography>
        </div>
      ) : (
        <>
          <div className="forgot-password__title">
            <Typography
              sx={{ fontWeight: '600', letterSpacing: '-1px' }}
              component="h5"
              variant="h5"
            >
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
          <form className="forgot-password__form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
      )}
    </motion.div>
  );
};
