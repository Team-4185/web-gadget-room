import type { FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminOrderKpiItem } from '@/core/types';

import './AdminOrderKpiCard.css';

interface IProps {
  item: IAdminOrderKpiItem;
}

export const AdminOrderKpiCard: FC<IProps> = ({ item }) => {
  const Icon = item.icon;

  return (
    <article className="admin-order-kpi-card">
      <div className="admin-order-kpi-card__top">
        <span className="admin-order-kpi-card__icon" aria-hidden>
          <Icon sx={{ fontSize: '22px' }} width={30} height={30} />
        </span>
        <Typography component="p" sx={{ fontSize: '24px', fontWeight: 600, lineHeight: 1 }}>
          {item.value}
        </Typography>
      </div>

      <Typography variant="body1" component="p" sx={{ marginTop: '20px', fontWeight: 600 }}>
        {item.title}
      </Typography>
    </article>
  );
};
