import type { DeliveryBranchesMap } from '@/core/types';

import { COURIER_BRANCHES, DHL_BRANCHES, NOVA_BRANCHES, UKR_BRANCHES } from './select';

export const DELIVERY_BRANCHES_BY_METHOD: DeliveryBranchesMap = {
  courier: COURIER_BRANCHES,
  nova: NOVA_BRANCHES,
  ukr: UKR_BRANCHES,
  dhl: DHL_BRANCHES,
};
