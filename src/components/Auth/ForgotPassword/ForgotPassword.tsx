import { useEffect, useState, type FC } from 'react';
import { Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';

import { FADEUP } from '@/core/constants';
import { type FormForgotPassword, forgotPasswordSchema } from '@/core/schemas';
import { authActions, useAppDispatch } from '@/core/store';
import { ChevronLeft } from '@/assets';
import { ForgotPasswordEmailStep } from './ForgotPasswordEmailStep';
import { ForgotPasswordInboxStep } from './ForgotPasswordInboxStep';

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
        <ForgotPasswordInboxStep
          sentEmail={sentEmail}
          onBackToLogin={() => navigate('/')}
          onResend={handleResend}
        />
      ) : (
        <ForgotPasswordEmailStep control={control} onSubmit={handleSubmit(onSubmit)} />
      )}
    </motion.div>
  );
};
