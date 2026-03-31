import type { ApiPhone, IProduct } from '@/core/types';
import { FALLBACK_PRODUCT_IMAGE } from '@/core/constants';

export const mapApiPhoneToProduct = (phone: ApiPhone, img: string = FALLBACK_PRODUCT_IMAGE): IProduct => ({
  id: phone.id,
  name: phone.name,
  price: phone.price,
  img,
  amount: 1,
});

export const buildSpecs = (phone: ApiPhone) => [
  { label: 'Screen Size', value: phone.screenSize },
  { label: 'CPU', value: phone.cpu },
  { label: 'Cores', value: String(phone.coresNumber) },
  { label: 'Main camera', value: phone.mainCamera },
  { label: 'Front camera', value: phone.frontCamera },
  { label: 'Battery', value: phone.batteryCapacity },
];
