import type { HTMLInputTypeAttribute } from 'react';
import { Tooltip } from '@mui/material';

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
  errorMessage?: string;
  tooltipText?: string;
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
  errorMessage,
  tooltipText,
  onChange,
}: IProps) => {
  const tooltip = errorMessage ?? tooltipText ?? '';

  return (
    <Tooltip title={tooltip} arrow>
      <label
        className={`labeled-form-field ${errorMessage ? 'is-error' : ''} ${className ?? ''}`.trim()}
      >
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
    </Tooltip>
  );
};
