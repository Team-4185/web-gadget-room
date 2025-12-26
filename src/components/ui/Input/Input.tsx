import type { ReactNode, FC } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { TextField } from '@mui/material';

import './Input.css';

type InputProps = {
  id?: string;
  label?: string;
  sx?: object;
  children?: ReactNode;
  select?: boolean;
  inherit?: boolean;
  type?: string;
  className?: string;
  defaultValue?: string;
  name?: string;
  value?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
};

export const Input: FC<InputProps> = ({
  id,
  label,
  sx,
  children,
  select,
  inherit,
  type,
  className,
  defaultValue,
  name,
  value,
  onChange,
}) => {
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
    <TextField
      type={type}
      select={select}
      sx={customSx}
      id={id}
      label={label}
      variant="outlined"
      className={`input ${className || ''}`}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange as any}
      name={name || id || label}
    >
      {children}
    </TextField>
  );
};
