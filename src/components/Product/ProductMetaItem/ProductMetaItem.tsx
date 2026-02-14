import type { ComponentType, FC, SVGProps } from 'react';

import { Typography } from '@mui/material';

import './ProductMetaItem.css';

interface IProps {
  label: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  alt: string;
}

export const ProductMetaItem: FC<IProps> = ({ label, value, icon, alt }) => {
  const Icon = icon;

  return (
    <div className="product-meta-item">
      <div className="product-meta-item__icon-box">
        <Icon className="product-meta-item__icon" aria-label={alt} role="img" />
      </div>
      <div className="product-meta-item__content">
        <Typography
          component="span"
          style={{
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '171%',
            color: 'var(--product-bottom-icon-text)',
          }}
        >
          {label}
        </Typography>
        <Typography
          component="span"
          style={{
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '171%',
            color: 'var(--black)',
          }}
        >
          {value}
        </Typography>
      </div>
    </div>
  );
};
