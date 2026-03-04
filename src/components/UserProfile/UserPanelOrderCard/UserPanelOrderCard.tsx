import type { FC } from 'react';
import { Typography } from '@mui/material';

import { StatusDelivered, SmallTruck } from '@/assets';
import type { IUserPanelOrder } from '@/core/types';

import './UserPanelOrderCard.css';

interface IProps {
  order: IUserPanelOrder;
}

const STATUS_META = {
  delivered: {
    label: 'Delivered',
    icon: StatusDelivered,
    className: 'is-delivered',
  },
  shipped: {
    label: 'Shipped',
    icon: SmallTruck,
    className: 'is-shipped',
  },
} as const;

export const UserPanelOrderCard: FC<IProps> = ({ order }) => {
  const status = STATUS_META[order.status];
  const StatusIcon = status.icon;

  return (
    <article className="user-panel-order-card">
      <div className="user-panel-order-card__header">
        <div>
          <Typography sx={{ marginBottom: '7px', fontWeight: 500 }}>Order Number</Typography>
          <Typography sx={{ fontWeight: 300, fontSize: '14px' }}>{order.orderNumber}</Typography>
        </div>
        <div>
          <Typography sx={{ marginBottom: '7px', fontWeight: 500 }}>Date</Typography>
          <Typography sx={{ fontWeight: 300, fontSize: '14px' }}>{order.date}</Typography>
        </div>
        <div>
          <Typography sx={{ marginBottom: '7px', fontWeight: 500 }}>Status</Typography>
          <span className={`user-panel-order-card__status ${status.className}`}>
            <StatusIcon width={17} height={17} fill="var(--white)" />
            <Typography component="span" sx={{ fontSize: '14px', color: 'inherit' }}>
              {status.label}
            </Typography>
          </span>
        </div>
        <div className="user-panel-order-card__total">
          <Typography sx={{ marginBottom: '7px', fontWeight: 500 }}>Total</Typography>
          <Typography sx={{ fontWeight: 500 }}>{`€ ${order.total.toFixed(2)}`}</Typography>
        </div>
      </div>

      <div className="user-panel-order-card__items">
        {order.items.map((item) => (
          <div className="user-panel-order-card__item" key={item.id}>
            <div className="user-panel-order-card__item-main">
              <div className="user-panel-order-card__item-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="user-panel-order-card__item-image"
                />
              </div>
              <div>
                <Typography sx={{ marginBottom: '15px', fontSize: '20px', fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ lineHeight: 1, fontWeight: 300 }}>
                  {`Quantity: ${item.quantity}`}
                </Typography>
              </div>
            </div>
            <Typography sx={{ fontWeight: 500 }}>{`€ ${item.price.toFixed(2)}`}</Typography>
          </div>
        ))}
      </div>
    </article>
  );
};
