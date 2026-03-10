import type { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { CheckBox } from '@/components';

interface IProps<T extends FieldValues> {
  id: string;
  name: FieldPath<T>;
  control: Control<T>;
  label: ReactNode;
}

export const FormCheckbox = <T extends FieldValues>({ id, name, control, label }: IProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <CheckBox
            {...field}
            id={id}
            label={label}
            checked={field.value}
            className="register__checkbox"
          />
          {fieldState.error && (
            <Typography sx={{ color: 'var(--coralRed)', fontSize: '14px', marginTop: '10px' }}>
              {fieldState.error.message}
            </Typography>
          )}
        </>
      )}
    />
  );
};
