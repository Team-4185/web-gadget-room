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
          <Icon width={25} height={25} style={{ color: 'var(--white)' }} />
        </span>
        <span
          className={`admin-panel-stat-card__trend ${item.isPositive ? 'is-positive' : 'is-negative'}`}
        >
          <Typography variant="body2" component="span" sx={{ color: 'inherit', lineHeight: 1 }}>
            {item.trend}
          </Typography>
        </span>
      </div>

      <Typography variant="body1" component="p" sx={{ fontWeight: 500 }}>
        {item.title}
      </Typography>
      <Typography
        component="p"
        sx={{ marginTop: '4px', fontSize: '24px', fontWeight: 600, lineHeight: 1 }}
      >
        {item.value}
      </Typography>
      <Typography variant="body2" component="p" sx={{ marginTop: '4px' }}>
        {item.subtitle}
      </Typography>
    </article>
  );
};
