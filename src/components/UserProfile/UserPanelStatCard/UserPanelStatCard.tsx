import type { FC } from 'react';
import { Typography } from '@mui/material';

import type { IUserPanelStatItem } from '@/core/types';

import './UserPanelStatCard.css';

interface IProps {
  item: IUserPanelStatItem;
}

export const UserPanelStatCard: FC<IProps> = ({ item }) => {
  const Icon = item.icon;

  return (
    <article className="user-panel-stat-card">
      <div className="user-panel-stat-card__icon">
        <Icon width={25} height={25} style={{ color: 'var(--white)' }} />
      </div>
      <Typography component="p" sx={{ marginBottom: '6px', fontSize: '16px', fontWeight: 500 }}>
        {item.label}
      </Typography>
      <Typography component="p" variant="h4" sx={{ fontSize: '24px', fontWeight: 600 }}>
        {item.value}
      </Typography>
    </article>
  );
};
