import type { FC } from 'react';
import {
  Accordion as AccordionMUI,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

import { CheckBox } from '@/components';
import { ArrowDown } from '@/assets';

import './Accordion.css';

interface IProps {
  title: string;
  items: string[];
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
          const isActive = active[item];

          return (
            <CheckBox
              key={item}
              id={item}
              name={item}
              label={item.charAt(0).toUpperCase() + item.slice(1)}
              checked={isActive}
              className="checkbox_small"
              onChange={() => onToggle(item)}
            />
          );
        })}
      </AccordionDetails>
    </AccordionMUI>
  );
};
