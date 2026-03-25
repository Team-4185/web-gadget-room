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
          <Icon sx={{ fontSize: '22px' }} width={25} height={25} />
        </span>
        <Typography variant="h4" component="p" sx={{ fontWeight: 600, lineHeight: 1 }}>
          {item.value}
        </Typography>
      </div>

      <Typography variant="body1" component="p" sx={{ marginTop: '12px', fontWeight: 600 }}>
        {item.title}
      </Typography>
    </article>
  );
};
