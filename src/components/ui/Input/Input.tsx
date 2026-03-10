import { useState, type FC } from 'react';
import { IconButton, InputAdornment, TextField, type SxProps, type Theme } from '@mui/material';

import { Completed, Error, Visibility, VisibilityOff } from '@/assets';

interface IProps {
  maxWidth?: string;
  type?: string;
  label: string;
  placeholder?: string;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: 'small' | 'medium';
  isPassword?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
}

export const Input: FC<IProps> = ({
  maxWidth = '100%',
  type = 'text',
  label,
  placeholder,
  success = false,
  error = false,
  disabled = false,
  required = false,
  size = 'small',
  isPassword,
  value,
  onChange,
  sx,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  let endAdornment;

  if (isPassword) {
    endAdornment = (
      <InputAdornment position="end">
        <IconButton
          aria-label={showPassword ? 'hide the password' : 'display the password'}
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          onMouseUp={handleMouseUpPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  } else if (error) {
    endAdornment = (
      <InputAdornment position="end">
        <Error />
      </InputAdornment>
    );
  } else if (success) {
    endAdornment = (
      <InputAdornment position="end">
        <Completed />
      </InputAdornment>
    );
  } else {
    endAdornment = null;
  }

  let computedType = type;

  if (isPassword) computedType = showPassword ? 'text' : 'password';

  return (
    <TextField
      type={computedType}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      error={error}
      disabled={disabled}
      required={required}
      label={error ? 'Please enter valid data' : label}
      variant="filled"
      size={size}
      slotProps={{
        input: {
          endAdornment,
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
          ...(size === 'medium' && {
            minHeight: '64px',
          }),

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
          ...(size === 'medium' && {
            padding: '25px 14px 9px',
            fontSize: '14px',
          }),
        },

        '& .MuiInputBase-sizeSmall .MuiInputBase-input': {
          paddingTop: '19px',
        },

        ...sx,
      }}
    />
  );
};
