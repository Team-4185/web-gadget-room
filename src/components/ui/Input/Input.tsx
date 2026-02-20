import type { ReactNode, FC } from 'react';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import type { SxProps, Theme } from '@mui/material/styles';

type InputProps = {
  inherit?: boolean;
  className?: string;
  children?: ReactNode;
  sx?: SxProps<Theme>;
} & Omit<TextFieldProps, 'variant' | 'classes'>;

export const Input: FC<InputProps> = ({ inherit, className, children, sx, ...props }) => {
  const baseSx: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
      minHeight: props.multiline ? 'unset' : '44px',
      borderRadius: '8px',
      background: 'var(--white)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--blue-violet)',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--blue-violet)',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--blue-violet)',
      },
    },
    '& .MuiInputBase-input': {
      fontSize: '16px',
      color: 'var(--black)',
      padding: '12px',
    },
    '& .MuiSelect-select': {
      padding: '0 36px 0 12px !important',
    },
    '& .MuiSelect-icon': {
      color: 'var(--blue-violet)',
    },
  };

  const inheritSx: SxProps<Theme> = inherit
    ? {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--blue-violet)',
        },
      }
    : {};

  const customSx: SxProps<Theme> = (theme) => {
    const resolvedSx = typeof sx === 'function' ? sx(theme) : sx;
    const normalizedResolvedSx = Array.isArray(resolvedSx)
      ? Object.assign({}, ...resolvedSx.filter(Boolean))
      : resolvedSx;

    return {
      ...(baseSx as Record<string, unknown>),
      ...(inheritSx as Record<string, unknown>),
      ...(normalizedResolvedSx as Record<string, unknown>),
    };
  };

  return (
    <TextField {...props} sx={customSx} variant="outlined" className={`input ${className || ''}`}>
      {children}
    </TextField>
  );
};
