import type { ApiPhoneColor, ApiStorageCapacity } from '@/core/types';

export const DEFAULT_PHONE_COLOR: ApiPhoneColor = {
  name: 'BLACK',
  displayName: 'Black',
  hexCode: '#000000',
};

export const getDefaultPhoneColor = (colors: ApiPhoneColor[] = []) =>
  colors.find((color) => color.name === DEFAULT_PHONE_COLOR.name) ??
  colors.find((color) => color.displayName.toLowerCase() === 'black') ??
  colors[0] ??
  DEFAULT_PHONE_COLOR;

export const getPhoneColorByName = (colors: ApiPhoneColor[] = [], colorName?: string) =>
  colors.find((color) => color.name === colorName) ?? getDefaultPhoneColor(colors);

export const DEFAULT_STORAGE_CAPACITY: ApiStorageCapacity = {
  name: 'CAPACITY_128GB',
  value: 128,
  unit: 'GB',
};

export const getDefaultStorageCapacity = (storageCapacity: ApiStorageCapacity[] = []) =>
  storageCapacity.find((storage) => storage.name === DEFAULT_STORAGE_CAPACITY.name) ??
  storageCapacity.find(
    (storage) => storage.value === DEFAULT_STORAGE_CAPACITY.value && storage.unit === 'GB'
  ) ??
  storageCapacity[0] ??
  DEFAULT_STORAGE_CAPACITY;

export const getStorageCapacityByName = (
  storageCapacity: ApiStorageCapacity[] = [],
  storageName?: string
) =>
  storageCapacity.find((storage) => storage.name === storageName) ??
  getDefaultStorageCapacity(storageCapacity);

export const formatStorageCapacity = (storage?: ApiStorageCapacity) =>
  storage ? `${storage.value}${storage.unit}` : '';
