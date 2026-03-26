import type { FC } from 'react';
import { Typography } from '@mui/material';

import { Alert } from '@/assets';

import type { IAdminPanelLowStockItem } from '@/core/types';

import './AdminPanelLowStock.css';

interface IProps {
  items: IAdminPanelLowStockItem[];
}

export const AdminPanelLowStock: FC<IProps> = ({ items }) => {
  return (
    <section className="admin-panel-low-stock" aria-label="Low stock alert">
      <div className="admin-panel-low-stock__title">
        <Alert />
        <Typography component="h3" sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1 }}>
          Low Stock Alert
        </Typography>
      </div>

      <div className="admin-panel-low-stock__list">
        {items.map((item) => (
          <article key={item.id} className="admin-panel-low-stock__item">
            <Typography variant="subtitle2" component="p" sx={{ fontWeight: 600 }}>
              {item.title}
            </Typography>
            <div>
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: 500, color: 'var(--red)' }}
              >
                Left: {item.left} pcs
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ color: 'var(--black-opacity-65)' }}
              >
                Threshold: {item.threshold}
              </Typography>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
