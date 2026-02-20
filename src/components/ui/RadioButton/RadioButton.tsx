import type { FC } from 'react';

import './RadioButton.css';

type RadioButtonProps = {
  checked: boolean;
  className?: string;
};

export const RadioButton: FC<RadioButtonProps> = ({ checked, className = '' }) => {
  return (
    <span
      className={`radio-button ${checked ? 'radio-button--checked' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      <span className="radio-button__dot" />
    </span>
  );
};
