import { Typography } from '@mui/material';

import { CircularProgress, UserPanelOrderCard } from '@/components';
import type { IUserPanelOrder } from '@/core/types';

type UserProfileOrdersTabProps = {
  orders: IUserPanelOrder[];
  ordersLoading: boolean;
  ordersError: string | null;
};

export const UserProfileOrdersTab = ({
  orders,
  ordersLoading,
  ordersError,
}: UserProfileOrdersTabProps) => (
  <div className="user-profile__orders" aria-label="My Orders">
    <div className="user-profile__orders-header">
      <Typography component="h2" sx={{ fontSize: '32px', fontWeight: 700, lineHeight: 1 }}>
        My Orders
      </Typography>
    </div>

    <div className="user-profile__orders-list">
      {ordersLoading ? <CircularProgress /> : null}
      {!ordersLoading && ordersError ? <Typography component="p">{ordersError}</Typography> : null}
      {!ordersLoading && !ordersError && !orders.length ? (
        <Typography component="p">No orders yet.</Typography>
      ) : null}
      {!ordersLoading &&
        !ordersError &&
        orders.map((order) => <UserPanelOrderCard key={order.id} order={order} />)}
    </div>
  </div>
);
