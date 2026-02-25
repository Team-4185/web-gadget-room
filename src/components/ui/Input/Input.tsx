import type { FC } from 'react';
import { InputAdornment, TextField, type SxProps, type Theme } from '@mui/material';

import { Completed, Error } from '@/assets';

interface IProps {
  maxWidth?: string;
  type?: string;
  label: string;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: 'small' | 'medium';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
}

export const Input: FC<IProps> = ({
  maxWidth = '100%',
  type = 'text',
  label,
  success = false,
  error = false,
  disabled = false,
  required = false,
  size = 'small',
  value,
  onChange,
  sx,
}) => {
  const endIcon = error ? <Error /> : success ? <Completed /> : null;

  return (
    <TextField
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      disabled={disabled}
      required={required}
      label={error ? 'Please enter valid email address' : label}
      variant="filled"
      size={size}
      slotProps={{
        input: {
          endAdornment: endIcon ? <InputAdornment position="end">{endIcon}</InputAdornment> : null,
        },
      }}
      sx={{
        maxWidth,
        width: '100%',

        '& .MuiInputLabel-root': {
          ...(success && { color: 'var(--chateau-green)' }),

          '&.Mui-disabled': {
            color: 'var(--black-opacity-13)',
          },

          '&.Mui-focused': {
            color: success ? 'var(--chateau-green)' : 'var(--black)',
          },

          '&.Mui-error': {
            color: 'var(--coralRed)',
          },
        },

        '& .MuiFilledInput-root': {
          borderRadius: '8px',
          border: `1px solid ${success ? 'var(--chateau-green)' : 'var(--light-yellow)'}`,
          backgroundColor: 'var(--white)',

          '&:hover': {
            backgroundColor: 'var(--white)',
          },

          '&.Mui-focused': {
            backgroundColor: 'var(--white)',
            border: `1px solid ${success ? 'var(--chateau-green)' : 'var(--blue-violet)'}`,
          },

          '&.Mui-error': {
            border: '1px solid var(--coralRed)',
          },

          '&.Mui-disabled': {
            backgroundColor: 'var(--white)',
            border: '1px solid var(--black-opacity-12)',

            '&::before': {
              borderBottomStyle: 'none',
            },
          },

          '&::after, &::before, &:hover:not(.Mui-disabled, .Mui-error)::before': {
            borderBottom: 'none',
          },
        },

        '& .MuiInputBase-input': {
          color: 'var(--black)',
        },

        '& .MuiInputBase-sizeSmall .MuiInputBase-input': {
          paddingTop: '19px',
        },

        ...sx,
      }}
    />
  );
};
