import type { ReactNode, FC } from 'react';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';

type InputProps = {
  inherit?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<TextFieldProps, 'variant' | 'classes'>;

export const Input: FC<InputProps> = ({ inherit, className, children, sx, ...props }) => {
  const customSx = inherit
    ? {
        ...sx,
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: 'inherit' },
          '&:hover fieldset': { borderColor: 'inherit' },
          '&.Mui-focused fieldset': { borderColor: 'inherit' },
        },
      }
    : sx;

  return (
    <TextField {...props} sx={customSx} variant="outlined" className={`input ${className || ''}`}>
      {children}
    </TextField>
  );
};
