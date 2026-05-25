import type {
  CreateOrderPayload,
  DeliveryCheckoutForm,
  DeliveryMethod,
  ICartItemDto,
  ISelectOption,
  OrderDeliveryMethod,
  OrderLogisticsCompany,
} from '@/core/types';
import { MOCK_CARD_PAYMENT_DETAILS, UKRAINE_REGIONS } from '@/core/constants';

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

export const createOrderPayloadFromCheckout = (
  form: DeliveryCheckoutForm,
  cartItems: ICartItemDto[]
): CreateOrderPayload => {
  const deliveryMethod = DELIVERY_METHOD_BY_FORM_METHOD[form.delivery.method];
  const paymentMethod = form.payment.method === 'receipt' ? 'CASH_ON_DELIVERY' : 'CARD';
  const selectedBranch = form.delivery.branchByMethod[form.delivery.method];
  const region = getOptionName(UKRAINE_REGIONS, form.recipient.region);

  return {
    customerEmail: form.recipient.email.trim(),
    customerFirstName: form.recipient.firstName.trim(),
    customerLastName: form.recipient.lastName.trim(),
    customerPhoneNumber: form.recipient.phone.trim(),
    paymentMethod,
    ...(paymentMethod === 'CARD' && { paymentDetails: MOCK_CARD_PAYMENT_DETAILS }),
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
          },
    items: cartItems.map(({ phoneId, amount }) => ({
      phoneId,
      quantity: amount,
    })),
  };
};

export const validateDeliveryCheckout = (
  form: DeliveryCheckoutForm,
  cartItems: ICartItemDto[]
): string | null => {
  const requiredRecipientFields = [
    form.recipient.firstName,
    form.recipient.lastName,
    form.recipient.email,
    form.recipient.phone,
    form.recipient.region,
  ];

  if (!cartItems.length) return 'Your cart is empty.';
  if (requiredRecipientFields.some((value) => !value.trim())) {
    return 'Please fill in all recipient fields.';
  }

  if (form.delivery.method === 'courier') {
    const { street, houseNumber, city, country, zipCode } = form.delivery.courierAddress;
    const requiredAddressFields = [street, houseNumber, city, country, zipCode];

    if (requiredAddressFields.some((value) => !value.trim())) {
      return 'Please fill in the courier address.';
    }
  } else if (!form.delivery.branchByMethod[form.delivery.method]) {
    return 'Please select a delivery branch.';
  }

  return null;
};
