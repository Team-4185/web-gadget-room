import type { ChangeEvent, FC } from 'react';
import { SearchOutlined } from '@mui/icons-material';

import './Search.css';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export const Search: FC<IProps> = ({
  value,
  onChange,
  placeholder = 'Search',
  ariaLabel = 'Search',
  className,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className={`ui-search ${className ?? ''}`.trim()} aria-label={ariaLabel}>
      <SearchOutlined sx={{ fontSize: '20px', color: 'var(--black-opacity-65)' }} />
      <input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
    </label>
  );
};
