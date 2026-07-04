import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';

import { adminOrdersService } from '@/core/services';
import type { AdminOrderAction, IAdminOrderDetails } from '@/core/types';
import { mapAdminOrderDetails, toErrorMessage } from '@/core/utils';

type UseAdminOrderActionsOptions = {
  onOrdersChanged: () => void;
};

export const useAdminOrderActions = ({ onOrdersChanged }: UseAdminOrderActionsOptions) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<IAdminOrderDetails | null>(null);
  const [isOrderDetailsLoading, setIsOrderDetailsLoading] = useState(false);
  const [isOrderActionLoading, setIsOrderActionLoading] = useState(false);

  const applyOrderAction = useCallback(
    async (orderId: string, action: AdminOrderAction) => {
      try {
        setIsOrderActionLoading(true);
        await adminOrdersService.applyAction(Number(orderId), action);
        onOrdersChanged();
        const details = await adminOrdersService.getOrder(Number(orderId));
        setSelectedOrderDetails(mapAdminOrderDetails(details));
        enqueueSnackbar('Order updated.', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(toErrorMessage(error, 'Failed to update order.'), { variant: 'error' });
        onOrdersChanged();
      } finally {
        setIsOrderActionLoading(false);
      }
    },
    [enqueueSnackbar, onOrdersChanged]
  );

  const openOrderDetails = useCallback(
    async (orderId: string) => {
      setIsOrderDetailsLoading(true);

      try {
        const details = await adminOrdersService.getOrder(Number(orderId));
        setSelectedOrderDetails(mapAdminOrderDetails(details));
      } catch (error) {
        enqueueSnackbar(toErrorMessage(error, 'Failed to load order details.'), {
          variant: 'error',
        });
      } finally {
        setIsOrderDetailsLoading(false);
      }
    },
    [enqueueSnackbar]
  );

  const closeOrderDetails = useCallback(() => {
    setSelectedOrderDetails(null);
    setIsOrderDetailsLoading(false);
    setIsOrderActionLoading(false);
  }, []);

  return {
    selectedOrderDetails,
    isOrderDetailsLoading,
    isOrderActionLoading,
    applyOrderAction,
    closeOrderDetails,
    openOrderDetails,
  };
};
