import type { FC } from 'react';
import { ErrorOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';

import type { IAdminPanelLowStockItem } from '@/core/types';

import './AdminPanelLowStock.css';

interface IProps {
  items: IAdminPanelLowStockItem[];
}

export const AdminPanelLowStock: FC<IProps> = ({ items }) => {
  return (
    <section className="admin-panel-low-stock" aria-label="Low stock alert">
      <div className="admin-panel-low-stock__title">
        <ErrorOutline sx={{ fontSize: '20px', color: 'var(--red)' }} />
        <Typography component="h3" sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1 }}>
          Low Stock Alert
        </Typography>
      </div>

      <div className="admin-panel-low-stock__list">
        {items.map((item) => (
          <article key={item.id} className="admin-panel-low-stock__item">
            <Typography component="p" sx={{ fontSize: '14px', fontWeight: 600 }}>
              {item.title}
            </Typography>
            <div>
              <Typography component="span" sx={{ fontSize: '14px', fontWeight: 500, color: 'var(--red)' }}>
                Left: {item.left} pcs
              </Typography>
              <Typography component="span" sx={{ fontSize: '14px', color: 'var(--black-opacity-65)' }}>
                Threshold: {item.threshold}
              </Typography>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
