import type { ApiPhone, IProduct } from '@/core/types';

const FALLBACK_IMAGE = '/icons/GraySquare.svg';

export const mapApiPhoneToProduct = (phone: ApiPhone): IProduct => ({
  id: phone.id,
  name: phone.name,
  price: phone.price,
  img: phone.images[0]?.url ?? FALLBACK_IMAGE,
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
