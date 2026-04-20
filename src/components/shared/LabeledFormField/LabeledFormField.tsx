import type { HTMLInputTypeAttribute } from 'react';

import './LabeledFormField.css';

interface IProps {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  min?: number | string;
  step?: number | string;
  multiline?: boolean;
  rows?: number;
  className?: string;
  onChange: (value: string) => void;
}

export const LabeledFormField = ({
  label,
  value,
  placeholder,
  required = false,
  type = 'text',
  min,
  step,
  multiline = false,
  rows = 5,
  className,
  onChange,
}: IProps) => {
  return (
    <label className={`labeled-form-field ${className ?? ''}`.trim()}>
      <span className="labeled-form-field__label">
        {label}
        {required ? ' *' : ''}
      </span>

      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value}
          min={min}
          step={step}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
};
