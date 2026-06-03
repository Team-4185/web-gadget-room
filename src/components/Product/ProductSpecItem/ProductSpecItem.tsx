import type { ComponentType, FC, SVGProps } from 'react';
import { Typography } from '@mui/material';

import './ProductSpecItem.css';

interface IProps {
  label: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  alt: string;
}

export const ProductSpecItem: FC<IProps> = ({ label, value, icon, alt }) => {
  const Icon = icon;

  return (
    <div className="product-spec-item">
      <div className="product-spec-item__icon-box">
        <Icon className="product-spec-item__icon" aria-label={alt} role="img" />
      </div>
      <div className="product-spec-item__content">
        <Typography
          component="span"
          style={{
            fontWeight: 300,
            fontSize: '14px',
            lineHeight: '114%',
            color: 'var(--black)',
          }}
        >
          {label}
        </Typography>
        <Typography
          component="span"
          className="product-spec-item__value"
          style={{
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '114%',
            color: 'var(--product-top-icon-text)',
          }}
        >
          {value}
        </Typography>
      </div>
    </div>
  );
};
