import { useState, type FC, type ReactNode } from 'react';
import { FormControl, Select as SelectMUI, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { ArrowDown } from '@/assets';
import type { ISelectOption } from '@/core/types';

import './Select.css';

interface IProps {
  data: ISelectOption[];
  maxWidth: string;
  height: string;
  color: string;
  fontSize: string;
  startIcon?: ReactNode;
}

export const Select: FC<IProps> = ({ data, maxWidth, height, color, fontSize, startIcon }) => {
  const [defaultValue, setDefaultValue] = useState<string>(data[0].value);

  const handleChange = (event: SelectChangeEvent) => {
    setDefaultValue(event.target.value as string);
  };

  return (
    <FormControl sx={{ maxWidth, width: '100%' }}>
      <SelectMUI
        sx={{ height, color, fontSize }}
        value={defaultValue}
        onChange={handleChange}
        IconComponent={ArrowDown}
        renderValue={(selected) => {
          const item = data.find((item) => item.value === selected);
          return (
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              {startIcon && startIcon}
              <span>{item?.name}</span>
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
