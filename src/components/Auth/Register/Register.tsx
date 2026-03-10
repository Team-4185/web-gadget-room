import { useEffect, type FC } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';

import { Button, FormInput, FormCheckbox } from '@/components';
import { FADEUP, EMAIL_TOOLTIP, PASSWORD_TOOLTIP } from '@/core/constants';
import { type FormRegisterValues, registerSchema } from '@/core/schemas';
import { useAppDispatch, authActions } from '@/core/store';

import './Register.css';

export const Register: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { control, handleSubmit, reset, formState } = useForm<FormRegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const onSubmit: SubmitHandler<FormRegisterValues> = async (data) => {
    const resultAction = await dispatch(authActions.register(data));

    if (authActions.register.fulfilled.match(resultAction)) {
      navigate('/home', { replace: true });
    } else {
      if (resultAction.payload) {
        enqueueSnackbar(resultAction.payload.detail, { variant: 'error' });
      } else {
        enqueueSnackbar(resultAction.error.message);
      }
    }
  };

  return (
    <motion.div className="register" variants={FADEUP} initial="hidden" animate="visible">
      <Typography sx={{ fontWeight: '600' }} component="h5" variant="h5">
        Register
      </Typography>
      <form className="register__form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          isPassword
          required
          autoComplete="new-password"
          sx={{ marginTop: '15px' }}
        />

        <FormInput
          name="passwordConfirmation"
          label="Repeat Password"
          control={control}
          isPassword
          required
          autoComplete="new-password"
          sx={{ marginTop: '15px' }}
        />

        <FormCheckbox
          id="terms"
          name="terms"
          control={control}
          label={
            <>
              I have read and accept the{' '}
              <Typography sx={{ color: 'var(--blue-violet)' }} component="span">
                Terms of <br /> Service & Privacy Policy *
              </Typography>
            </>
          }
        />

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
