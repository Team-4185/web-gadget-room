import type { FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminPanelProductItem } from '@/core/types';

import './AdminPanelProductRow.css';

interface IProps {
  item: IAdminPanelProductItem;
}

export const AdminPanelProductRow: FC<IProps> = ({ item }) => {
  return (
    <article className="admin-panel-product-row">
      <div className="admin-panel-product-row__left">
        <img src={item.image} alt={item.title} />
        <div>
          <Typography variant="subtitle1" component="h4" sx={{ fontWeight: 600 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" component="p" sx={{ color: 'var(--black-opacity-65)' }}>
            {item.sales}
          </Typography>
        </div>
      </div>

      <div className="admin-panel-product-row__meta">
        <Typography variant="body2" component="p" sx={{ color: 'var(--black-opacity-65)' }}>
          {item.trend}
        </Typography>
        <div>
          <Typography variant="body2" component="p" sx={{ color: 'var(--black-opacity-65)' }}>
            In Stock
          </Typography>
          <Typography component="p" sx={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.1 }}>
            {item.stock}
          </Typography>
        </div>
      </div>
    </article>
  );
};
