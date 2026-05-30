import { useState, type FC, type ReactNode } from 'react';
import { FormControl, Select as SelectMUI, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { ChevronDown } from '@/assets';
import type { ISelectOption } from '@/core/types';

interface IProps {
  data: ISelectOption[];
  maxWidth: string;
  height: string;
  color: string;
  fontSize: string;
  styleVariant?: 'default' | 'subtleBorder';
  selectPadding?: string;
  startIcon?: ReactNode;
  initialValue?: string;
  placeholder?: string;
  error?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export const Select: FC<IProps> = ({
  data,
  maxWidth,
  height,
  color,
  fontSize,
  styleVariant = 'default',
  selectPadding,
  startIcon,
  initialValue,
  placeholder,
  error = false,
  value,
  onChange,
}) => {
  const [defaultValue, setDefaultValue] = useState<string>(initialValue ?? data[0]?.value ?? '');
  const selectedValue = value ?? defaultValue;

  const handleChange = (event: SelectChangeEvent) => {
    const nextValue = event.target.value as string;

    if (value === undefined) {
      setDefaultValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <FormControl sx={{ maxWidth, width: '100%' }}>
      <SelectMUI
        sx={{
          height,
          color,
          fontSize,
          '& .MuiSelect-select.MuiSelect-select': {
            padding: selectPadding,
          },
          ...(error && {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--coralRed)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--coralRed)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--coralRed)',
            },
          }),
        }}
        data-style-variant={styleVariant === 'subtleBorder' ? 'subtleBorder' : undefined}
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 48 * 6,
              overflowY: 'auto',
            },
          },
        }}
        IconComponent={ChevronDown}
        renderValue={(selected) => {
          if (!selected) {
            return (
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                {startIcon && startIcon}
                <span>{placeholder ?? ''}</span>
              </div>
            );
          }

          const item = data.find((item) => item.value === selected);
          return (
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              {startIcon && startIcon}
              <span>{item?.name ?? placeholder ?? ''}</span>
            </div>
          );
        }}
      >
        {data.map((info) => (
          <MenuItem key={info.value} value={info.value}>
            {info.name}
          </MenuItem>
        ))}
      </SelectMUI>
    </FormControl>
  );
};
