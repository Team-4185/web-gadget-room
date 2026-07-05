import {
  ProductInfoBatteryIcon,
  ProductInfoCameraIcon,
  ProductInfoCoreIcon,
  ProductInfoCpuIcon,
  ProductInfoDeliveryTrackIcon,
  ProductInfoFrontCameraIcon,
  ProductInfoPhoneIcon,
  ProductInfoShopIcon,
  ProductInfoVerifyIcon,
} from '@/assets';

export const PRODUCT_SPECS_META = [
  {
    id: 1,
    label: 'Screen Size',
    icon: ProductInfoPhoneIcon,
    alt: 'Screen icon',
  },
  {
    id: 2,
    label: 'CPU',
    icon: ProductInfoCpuIcon,
    alt: 'CPU icon',
  },
  {
    id: 3,
    label: 'Cores',
    icon: ProductInfoCoreIcon,
    alt: 'Core icon',
  },
  {
    id: 4,
    label: 'Main camera',
    icon: ProductInfoCameraIcon,
    alt: 'Camera icon',
  },
  {
    id: 5,
    label: 'Front camera',
    icon: ProductInfoFrontCameraIcon,
    alt: 'Front-camera icon',
  },
  {
    id: 6,
    label: 'Battery',
    icon: ProductInfoBatteryIcon,
    alt: 'Battery icon',
  },
  {
    id: 7,
    label: 'Release year',
    icon: ProductInfoPhoneIcon,
    alt: 'Release year icon',
  },
  {
    id: 8,
    label: 'Storage',
    icon: ProductInfoCoreIcon,
    alt: 'Storage icon',
  },
] as const;

export const SPECS = [
  {
    id: 1,
    label: 'Screen Size',
    value: '6.7',
    icon: ProductInfoPhoneIcon,
    alt: 'Screen icon',
  },
  {
    id: 2,
    label: 'CPU',
    value: 'Samsung',
    icon: ProductInfoCpuIcon,
    alt: 'CPU icon',
  },
  {
    id: 3,
    label: 'Cores',
    value: '6',
    icon: ProductInfoCoreIcon,
    alt: 'Core icon',
  },
  {
    id: 4,
    label: 'Main camera',
    value: '48-12-12 MP',
    icon: ProductInfoCameraIcon,
    alt: 'Camera icon',
  },
  {
    id: 5,
    label: 'Front camera',
    value: '12 MP',
    icon: ProductInfoFrontCameraIcon,
    alt: 'Front-camera icon',
  },
  {
    id: 6,
    label: 'Battery',
    value: '4323 mAh',
    icon: ProductInfoBatteryIcon,
    alt: 'Battery icon',
  },
  {
    id: 7,
    label: 'Release year',
    value: '2024',
    icon: ProductInfoPhoneIcon,
    alt: 'Release year icon',
  },
  {
    id: 8,
    label: 'Storage',
    value: '128GB',
    icon: ProductInfoCoreIcon,
    alt: 'Storage icon',
  },
];

export const PRODUCT_META = [
  {
    id: 1,
    label: 'Delivery',
    value: '1-2 day',
    icon: ProductInfoDeliveryTrackIcon,
    alt: 'Delivery Icon',
  },
  {
    id: 2,
    label: 'In Stock',
    value: 'Today',
    icon: ProductInfoShopIcon,
    alt: 'Shop Icon',
  },
  {
    id: 3,
    label: 'Guaranteed',
    value: '1 year',
    icon: ProductInfoVerifyIcon,
    alt: 'Guaranteed Icon',
  },
];
