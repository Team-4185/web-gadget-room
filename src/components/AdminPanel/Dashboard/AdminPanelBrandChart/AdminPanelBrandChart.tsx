import type { FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminPanelBrandItem } from '@/core/types';

import './AdminPanelBrandChart.css';

interface IProps {
  brands: IAdminPanelBrandItem[];
}

export const AdminPanelBrandChart: FC<IProps> = ({ brands }) => {
  const gradient = brands
    .map((item, index) => {
      const previous = brands.slice(0, index).reduce((acc, current) => acc + current.share, 0);
      return `${item.color} ${previous}% ${previous + item.share}%`;
    })
    .join(', ');

  return (
    <section className="admin-panel-brand-chart" aria-label="Sales by brand">
      <Typography component="h3" sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1 }}>
        Sales by brand
      </Typography>

      <div className="admin-panel-brand-chart__donut-wrap">
        <div
          className="admin-panel-brand-chart__donut"
          aria-hidden
          style={{ background: `conic-gradient(${gradient})` }}
        />
      </div>

      <ul className="admin-panel-brand-chart__legend" role="list">
        {brands.map((item) => (
          <li key={item.id}>
            <span className="admin-panel-brand-chart__legend-name">
              <span style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
            <Typography variant="body2" component="span" sx={{ color: 'var(--black-opacity-65)' }}>
              {item.share}%
            </Typography>
          </li>
        ))}
      </ul>
    </section>
  );
};
