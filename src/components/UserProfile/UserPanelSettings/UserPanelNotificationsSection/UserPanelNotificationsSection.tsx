import type { FC } from 'react';
import { Typography } from '@mui/material';

import { UserPanelNotificationItem } from '@/components';

import './UserPanelNotificationsSection.css';

interface NotificationState {
  orderUpdates: boolean;
  promotions: boolean;
  newArrivals: boolean;
}

interface UserPanelNotificationsSectionProps {
  value: NotificationState;
  onToggle: (key: keyof NotificationState) => void;
}

export const UserPanelNotificationsSection: FC<UserPanelNotificationsSectionProps> = ({
  value,
  onToggle,
}) => {
  return (
    <div className="user-profile__settings-card user-profile__settings-card--notifications">
      <Typography component="h3" sx={{ fontSize: '24px', fontWeight: 700, lineHeight: 1 }}>
        Notifications
      </Typography>

      <div className="user-profile__settings-notifications">
        <UserPanelNotificationItem
          id="order-updates"
          name="order-updates"
          title="Order Updates"
          description="Get notified about order status"
          checked={value.orderUpdates}
          onChange={() => onToggle('orderUpdates')}
        />

        <UserPanelNotificationItem
          id="promotions"
          name="promotions"
          title="Promotions"
          description="Receive special offers and deals"
          checked={value.promotions}
          onChange={() => onToggle('promotions')}
        />

        <UserPanelNotificationItem
          id="new-arrivals"
          name="new-arrivals"
          title="New Arrivals"
          description="Get updates about new products"
          checked={value.newArrivals}
          onChange={() => onToggle('newArrivals')}
        />
      </div>
    </div>
  );
};
