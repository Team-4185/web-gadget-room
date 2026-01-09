import type { FC } from 'react';

import './Checkbox.css';

type CheckBoxProps = {
  id: string | undefined;
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
};

export const CheckBox: FC<CheckBoxProps> = ({ id, name, label, checked, onChange, className }) => {
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
      <span className="checkbox__label">{label}</span>
    </label>
  );
};
