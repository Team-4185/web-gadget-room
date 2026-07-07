import { Typography } from '@mui/material';

import { ChevronRight } from '@/assets';
import { CircularProgress, UserPanelOrderCard, UserPanelStatCard } from '@/components';
import type { IUserPanelOrder, IUserPanelStatItem } from '@/core/types';

type UserProfileOverviewTabProps = {
  greeting: string;
  subtitle: string;
  stats: IUserPanelStatItem[];
  recentOrders: IUserPanelOrder[];
  ordersLoading: boolean;
  ordersError: string | null;
  onViewAllOrders: () => void;
};

export const UserProfileOverviewTab = ({
  greeting,
  subtitle,
  stats,
  recentOrders,
  ordersLoading,
  ordersError,
  onViewAllOrders,
}: UserProfileOverviewTabProps) => (
  <>
    <div className="user-profile__hero">
      <Typography
        component="h2"
        sx={{
          marginBottom: '4px',
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        {greeting}
      </Typography>
      <Typography
        component="p"
        sx={{
          margin: 0,
          fontSize: '14px',
        }}
      >
        {subtitle}
      </Typography>
    </div>

    <div className="user-profile__stats" aria-label="Account overview">
      {stats.map((item) => (
        <UserPanelStatCard key={item.id} item={item} />
      ))}
    </div>

    <div className="user-profile__orders" aria-label="Recent Orders">
      <div className="user-profile__orders-header">
        <Typography
          component="h2"
          variant="h6"
          sx={{
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          Recent Orders
        </Typography>
        <button type="button" className="user-profile__view-all" onClick={onViewAllOrders}>
          <Typography component="span" sx={{ fontSize: '20px', color: 'inherit' }}>
            View All
          </Typography>
          <ChevronRight width={18} height={18} />
        </button>
      </div>

      <div className="user-profile__orders-list">
        {ordersLoading ? <CircularProgress /> : null}
        {!ordersLoading && ordersError ? (
          <Typography component="p">{ordersError}</Typography>
        ) : null}
        {!ordersLoading && !ordersError && !recentOrders.length ? (
          <Typography component="p">No recent orders yet.</Typography>
        ) : null}
        {!ordersLoading &&
          !ordersError &&
          recentOrders.map((order) => <UserPanelOrderCard key={order.id} order={order} />)}
      </div>
    </div>
  </>
);
