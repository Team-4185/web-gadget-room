import type { ChangeEvent, FC, ReactNode, Ref } from 'react';
import { Typography } from '@mui/material';

import './Checkbox.css';

type CheckBoxProps = {
  id: string | undefined;
  name: string;
  label: ReactNode;
  ref?: Ref<any>;
  labelSize?: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const CheckBox: FC<CheckBoxProps> = ({
  id,
  name,
  label,
  ref,
  labelSize = '16px',
  checked,
  onChange,
  className,
}) => {
  return (
    <label className={`checkbox ${className}`} htmlFor={id}>
      <input
        type="checkbox"
        ref={ref}
        name={name}
        id={id}
        checked={checked ?? false}
        className="checkbox__input"
        onChange={onChange}
      />
      <span className="checkbox__icon" />
      <Typography sx={{ fontSize: labelSize, color: 'var(--black)' }}>{label}</Typography>
    </label>
  );
};
