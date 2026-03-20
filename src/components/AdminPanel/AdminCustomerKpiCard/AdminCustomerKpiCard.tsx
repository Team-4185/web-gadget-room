import type { FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminCustomerKpiItem } from '@/core/types';

import './AdminCustomerKpiCard.css';

interface IProps {
  item: IAdminCustomerKpiItem;
}

export const AdminCustomerKpiCard: FC<IProps> = ({ item }) => {
  const Icon = item.icon;

  return (
    <article className="admin-customer-kpi-card">
      <div className="admin-customer-kpi-card__top">
        <span className="admin-customer-kpi-card__icon" aria-hidden>
          <Icon sx={{ fontSize: '22px' }} />
        </span>
        <Typography component="p" sx={{ fontSize: '34px', fontWeight: 600, lineHeight: 1 }}>
          {item.value}
        </Typography>
      </div>

      <Typography component="p" sx={{ marginTop: '12px', fontSize: '16px', fontWeight: 600 }}>
        {item.title}
      </Typography>
    </article>
  );
};
