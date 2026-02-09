import type { FC } from 'react';
import {
  Accordion as AccordionMUI,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

import { CheckBox } from '@/components';
import type { ICheckboxOption } from '@/core/types';
import { ArrowDown } from '@/assets';

import './Accordion.css';

interface IProps {
  title: string;
  items: ICheckboxOption[];
  active: Record<string, boolean>;
  onToggle: (item: string) => void;
  defaultExpanded?: boolean;
  className?: string;
}

export const Accordion: FC<IProps> = ({
  title,
  items,
  active,
  onToggle,
  defaultExpanded = true,
  className,
}) => {
  return (
    <AccordionMUI
      defaultExpanded={defaultExpanded}
      elevation={0}
      className={`accordion ${className}`}
    >
      <AccordionSummary
        expandIcon={<ArrowDown />}
        sx={{
          minHeight: 40,
          '&.Mui-expanded': {
            minHeight: 40,
          },
          borderRadius: '6px',
          boxShadow: '0px 0px 7px 0px var(--blue-violet)',
          background: 'var(--white)',
        }}
      >
        <Typography
          className="accordion__title"
          sx={{ fontSize: '20px', fontWeight: 500, color: 'var(--black)' }}
        >
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails className="accordion__details">
        {items.map((item) => {
          const isActive = active[item.value];

          return (
            <CheckBox
              key={item.value}
              id={item.value}
              name={item.value}
              label={item.label}
              checked={isActive}
              className="checkbox_small"
              onChange={() => onToggle(item.value)}
            />
          );
        })}
      </AccordionDetails>
    </AccordionMUI>
  );
};
