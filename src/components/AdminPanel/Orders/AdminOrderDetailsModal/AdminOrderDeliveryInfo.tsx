import { Typography } from '@mui/material';

import type { IAdminOrderDetails } from '@/core/types';

type AdminOrderDeliveryInfoProps = {
  order: IAdminOrderDetails;
};

export const AdminOrderDeliveryInfo = ({ order }: AdminOrderDeliveryInfoProps) => (
  <>
    <section className="admin-order-details-modal__section">
      <Typography component="h4" fontSize="16px" fontWeight={600}>
        Customer
      </Typography>
      <div className="admin-order-details-modal__field-grid">
        <div>
          <Typography component="span" fontSize="14px" fontWeight={500}>
            Name
          </Typography>
          <Typography component="p" fontSize="13px" fontWeight={400}>
            {order.customer}
          </Typography>
        </div>
        <div>
          <Typography component="span" fontSize="14px" fontWeight={500}>
            Phone
          </Typography>
          <Typography component="p" fontSize="13px" fontWeight={400}>
            {order.phone}
          </Typography>
        </div>
        <div>
          <Typography component="span" fontSize="14px" fontWeight={500}>
            Email
          </Typography>
          <Typography component="p" fontSize="13px" fontWeight={400}>
            {order.email}
          </Typography>
        </div>
      </div>
    </section>

    <section className="admin-order-details-modal__section">
      <Typography component="h4" fontSize="16px" fontWeight={600}>
        Delivery
      </Typography>
      <div className="admin-order-details-modal__field-grid admin-order-details-modal__field-grid--delivery">
        <div>
          <Typography component="span" fontSize="14px" fontWeight={600}>
            Method
          </Typography>
          <Typography component="p" fontSize="13px" fontWeight={400}>
            {order.deliveryMethod}
          </Typography>
        </div>
        <div>
          <Typography component="span" fontSize="14px" fontWeight={600}>
            Address
          </Typography>
          <Typography component="p" fontSize="13px" fontWeight={400}>
            {order.shippingAddress}
          </Typography>
        </div>
      </div>
    </section>
  </>
);
