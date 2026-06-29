import type { ChangeEvent, FC } from 'react';

import { Search as SearchIcon } from '@/assets';

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
      <SearchIcon style={{ color: 'var(--black)' }} />
      <input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
    </label>
  );
};
