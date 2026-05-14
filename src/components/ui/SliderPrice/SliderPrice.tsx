import type { FC } from 'react';
import { Slider, Typography } from '@mui/material';

import './SliderPrice.css';

interface IProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (_event: Event, value: number | number[]) => void;
  className?: string;
}

export const SliderPrice: FC<IProps> = ({ value, min, max, step = 10, onChange, className }) => {
  return (
    <div className={`slider-price ${className}`}>
      <Typography
        className="slider-price__title"
        sx={{
          fontSize: '20px',
          fontWeight: 500,
          color: 'var(--black)',
          padding: '0 6px',
        }}
      >
        Price
      </Typography>
      <div className="slider-price__prices">
        <Typography sx={{ fontSize: 15, fontWeight: 500, color: 'var(--black)' }}>
          $ {min}
        </Typography>
        <Typography sx={{ fontSize: 15, fontWeight: 500, color: 'var(--black)' }}>
          $ {value}
        </Typography>
      </div>
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        size="medium"
        valueLabelDisplay="auto"
        className="slider-price__control"
        sx={{
          color: 'var(--blue-violet)',
          height: 5,

          '& .MuiSlider-thumb': {
            width: 13,
            height: 13,
            backgroundColor: 'var(--white)',
            border: '3px solid var(--dark-yellow)',
            boxShadow: '0px 0px 4px 0px var(--dark-yellow)',

            '&:hover': {
              boxShadow: 'none',
            },

            '&.Mui-focusVisible': {
              boxShadow: 'none',
            },

            '&.Mui-active': {
              boxShadow: 'none',
            },
          },
        }}
      />
    </div>
  );
};
