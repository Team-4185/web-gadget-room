import type { InputHTMLAttributes, ReactNode } from 'react';
import { type SxProps, type Theme } from '@mui/material';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { Input } from '@/components/ui';

interface IProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  tooltipText?: ReactNode;
  maxWidth?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  label: string;
  size?: 'small' | 'medium';
  required?: boolean;
  disabled?: boolean;
  isPassword?: boolean;
  autoComplete?: string;
  sx?: SxProps<Theme>;
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  tooltipText,
  maxWidth = '100%',
  type = 'text',
  label,
  size = 'small',
  required = false,
  disabled = false,
  isPassword = false,
  autoComplete,
  sx,
}: IProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <Input
          {...field}
          tooltipText={tooltipText}
          maxWidth={maxWidth}
          type={type}
          label={label}
          size={size}
          required={required}
          disabled={disabled}
          isPassword={isPassword}
          autoComplete={autoComplete}
          error={fieldState.error}
          success={!fieldState.error && formState.isSubmitted}
          sx={{ ...sx }}
        />
      )}
    />
  );
};
