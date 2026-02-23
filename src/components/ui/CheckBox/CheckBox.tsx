import type { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

import './Checkbox.css';

type CheckBoxProps = {
  id: string | undefined;
  name: string;
  label: ReactNode;
  labelSize?: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
};

export const CheckBox: FC<CheckBoxProps> = ({
  id,
  name,
  label,
  labelSize = '16px',
  checked,
  onChange,
  className,
}) => {
  return (
    <label className={`checkbox ${className}`} htmlFor={id}>
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        className="checkbox__input"
        onChange={onChange}
      />
      <span className="checkbox__icon" />
      <Typography sx={{ fontSize: labelSize, color: 'var(--black)' }}>{label}</Typography>
    </label>
  );
};
