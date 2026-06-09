import type {
  CheckoutOrderPayload,
  CreateOrderPayload,
  CourierAddressForm,
  DeliveryCheckoutForm,
  DeliveryCheckoutErrors,
  DeliveryMethod,
  ICartItemDto,
  ISelectOption,
  OrderDeliveryMethod,
  OrderLogisticsCompany,
  OrderPaymentDetailsPayload,
} from '@/core/types';
import {
  BRANCH_ADDRESS_BY_ID,
  DEFAULT_BRANCH_ADDRESS,
  MOCK_CARD_PAYMENT_DETAILS,
  UKRAINE_REGIONS,
} from '@/core/constants';
import { deliveryCheckoutSchema } from '@/core/schemas';
import { normalizePhoneNumber } from '@/core/utils/phoneFormat';
import { getDefaultPhoneColor, getDefaultStorageCapacity } from './productVariants';

export const TEMP_ORDER_ITEM_COLOR = 'BLACK';
export const TEMP_ORDER_ITEM_STORAGE = 'CAPACITY_128GB';

const LOGISTICS_COMPANY_BY_METHOD: Record<DeliveryMethod, OrderLogisticsCompany> = {
  courier: 'NOVA_POSHTA',
  nova: 'NOVA_POSHTA',
  ukr: 'UKR_POSHTA',
  dhl: 'DHL',
};

const DELIVERY_METHOD_BY_FORM_METHOD: Record<DeliveryMethod, OrderDeliveryMethod> = {
  courier: 'COURIER',
  nova: 'POST_OFFICE',
  ukr: 'POST_OFFICE',
  dhl: 'POST_OFFICE',
};

const getOptionName = (options: ISelectOption[], value: string) =>
  options.find((option) => option.value === value)?.name ?? value;

const getCheckoutItemColor = (item: ICartItemDto) =>
  item.selectedColor?.name ?? getDefaultPhoneColor(item.colors).name ?? TEMP_ORDER_ITEM_COLOR;

const getCheckoutItemStorage = (item: ICartItemDto) =>
  item.selectedStorage?.name ??
  getDefaultStorageCapacity(item.storageCapacity).name ??
  TEMP_ORDER_ITEM_STORAGE;

const getCheckoutItemQuantity = (item: ICartItemDto) => item.amount ?? item.quantity ?? 0;

export const createOrderPayloadFromCheckout = (
  form: DeliveryCheckoutForm,
  cartItems: ICartItemDto[],
  paymentDetails: OrderPaymentDetailsPayload = MOCK_CARD_PAYMENT_DETAILS
): CreateOrderPayload => {
  const deliveryMethod = DELIVERY_METHOD_BY_FORM_METHOD[form.delivery.method];
  const paymentMethod = form.payment.method === 'receipt' ? 'CASH_ON_DELIVERY' : 'CARD';
  const selectedBranch = form.delivery.branchByMethod[form.delivery.method];
  const selectedBranchAddress = BRANCH_ADDRESS_BY_ID[selectedBranch] ?? DEFAULT_BRANCH_ADDRESS;
  const region = getOptionName(UKRAINE_REGIONS, form.recipient.region);

  return {
    customerEmail: form.recipient.email.trim(),
    customerFirstName: form.recipient.firstName.trim(),
    customerLastName: form.recipient.lastName.trim(),
    customerPhoneNumber: normalizePhoneNumber(form.recipient.phone),
    paymentMethod,
    ...(paymentMethod === 'CARD' && { paymentDetails }),
    deliveryMethod,
    shippingAddress:
      deliveryMethod === 'COURIER'
        ? {
            apartmentNumber: form.delivery.courierAddress.apartmentNumber.trim() || undefined,
            houseNumber: form.delivery.courierAddress.houseNumber.trim(),
            logisticsCompany: LOGISTICS_COMPANY_BY_METHOD[form.delivery.method],
            street: form.delivery.courierAddress.street.trim(),
            city: form.delivery.courierAddress.city.trim(),
            region,
            country: form.delivery.courierAddress.country.trim(),
            zipCode: form.delivery.courierAddress.zipCode.trim(),
          }
        : {
            logisticsCompany: LOGISTICS_COMPANY_BY_METHOD[form.delivery.method],
            logisticPostOffice: selectedBranch,
            region,
            country: selectedBranchAddress.country,
            zipCode: selectedBranchAddress.zipCode,
          },
    items: cartItems.map((item) => ({
      phoneId: item.phoneId,
      quantity: getCheckoutItemQuantity(item),
      color: getCheckoutItemColor(item),
      storage: getCheckoutItemStorage(item),
    })),
  };
};

export const createCheckoutPayloadFromDeliveryAndPayment = (
  form: DeliveryCheckoutForm,
  cartItems: ICartItemDto[],
  paymentDetails?: OrderPaymentDetailsPayload
): CheckoutOrderPayload => {
  const { items, ...orderDetails } = createOrderPayloadFromCheckout(form, cartItems, paymentDetails);

  return {
    ...orderDetails,
    itemSelections: items.map(({ phoneId, color, storage }) => ({
      phoneId,
      color,
      storage,
    })),
  };
};

export const validateDeliveryCheckout = (
  form: DeliveryCheckoutForm,
  cartItems: ICartItemDto[]
): DeliveryCheckoutErrors => {
  const result = deliveryCheckoutSchema.safeParse(form);
  const errors: DeliveryCheckoutErrors = {};

  if (!cartItems.length) {
    errors.cart = 'Your cart is empty.';
  }

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const [section, group, field] = issue.path;

      if (section === 'recipient' && typeof group === 'string') {
        errors.recipient = {
          ...errors.recipient,
          [group]: issue.message,
        };
      }

      if (section === 'delivery' && group === 'courierAddress' && typeof field === 'string') {
        errors.delivery = {
          ...errors.delivery,
          courierAddress: {
            ...errors.delivery?.courierAddress,
            [field as keyof CourierAddressForm]: issue.message,
          },
        };
      }
    });
  }

  if (form.delivery.method === 'courier') {
    return errors;
  } else {
    if (!form.delivery.branchByMethod[form.delivery.method]) {
      errors.delivery = {
        ...errors.delivery,
        branchByMethod: {
          ...errors.delivery?.branchByMethod,
          [form.delivery.method]: 'Please select a delivery branch.',
        },
      };
    }
  }

  delete errors.delivery?.courierAddress;

  return errors;
};

export const getDeliveryCheckoutValidationMessage = (errors: DeliveryCheckoutErrors) => {
  if (errors.cart) return errors.cart;
  if (errors.recipient && Object.keys(errors.recipient).length) {
    return 'Please fix the highlighted recipient fields.';
  }
  if (errors.delivery?.courierAddress && Object.keys(errors.delivery.courierAddress).length) {
    return 'Please fix the highlighted courier address fields.';
  }
  if (errors.delivery?.branchByMethod && Object.keys(errors.delivery.branchByMethod).length) {
    return 'Please select a delivery branch.';
  }

  return null;
};
