import type { FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminPanelStatItem } from '@/core/types';

import './AdminPanelStatCard.css';

interface IProps {
  item: IAdminPanelStatItem;
}

export const AdminPanelStatCard: FC<IProps> = ({ item }) => {
  const Icon = item.icon;

  return (
    <article className="admin-panel-stat-card">
      <div className="admin-panel-stat-card__top">
        <span className="admin-panel-stat-card__icon" aria-hidden>
          <Icon sx={{ fontSize: '22px' }} />
        </span>
        <span className={`admin-panel-stat-card__trend ${item.isPositive ? 'is-positive' : 'is-negative'}`}>
          <Typography component="span" sx={{ fontSize: '14px', color: 'inherit', lineHeight: 1 }}>
            {item.trend}
          </Typography>
        </span>
      </div>

      <Typography component="p" sx={{ fontSize: '16px', fontWeight: 500 }}>
        {item.title}
      </Typography>
      <Typography component="p" sx={{ marginTop: '4px', fontSize: '24px', fontWeight: 600, lineHeight: 1 }}>
        {item.value}
      </Typography>
      <Typography component="p" sx={{ marginTop: '4px', fontSize: '14px' }}>
        {item.subtitle}
      </Typography>
    </article>
  );
};
