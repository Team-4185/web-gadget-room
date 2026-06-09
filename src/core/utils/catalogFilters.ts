import type { CatalogApiSort, ICheckboxOption, IProduct, SortOption } from '@/core/types';

import { CATALOG_PAGE_SIZE } from '@/core/constants';

export const getCatalogApiSort = (sortBy: SortOption): CatalogApiSort => sortBy;

export const buildCatalogBrandOptions = (brands: string[]): ICheckboxOption[] =>
  brands
    .map((brand) => brand.trim())
    .filter(Boolean)
    .map((brand) => ({
      value: brand,
      label: brand,
    }));

export const buildCatalogColorOptions = (
  colors: { name: string; displayName: string }[]
): ICheckboxOption[] =>
  colors.map((color) => ({
    value: color.name,
    label: color.displayName,
  }));

export const buildCatalogStorageOptions = (
  storageCapacities: { name: string; value: number; unit: string }[]
): ICheckboxOption[] =>
  storageCapacities.map((storage) => ({
    value: storage.name,
    label: `${storage.value}${storage.unit}`,
  }));

export const buildCatalogActiveItems = (brandOptions: ICheckboxOption[]) =>
  brandOptions.reduce<Record<string, boolean>>((acc, item) => {
    acc[item.value] = false;
    return acc;
  }, {});

export const getSelectedCatalogBrands = (
  activeItems: Record<string, boolean>,
  brandOptions: ICheckboxOption[]
) => brandOptions.filter((brand) => activeItems[brand.value]).map((brand) => brand.label);

export const getSelectedCatalogOptionValues = (
  activeItems: Record<string, boolean>,
  options: ICheckboxOption[]
) => options.filter((option) => activeItems[option.value]).map((option) => option.value);

export const sortFallbackCatalogProducts = (products: IProduct[], sortBy: SortOption) => {
  const sortedProducts = [...products];

  if (sortBy === 'name_asc') {
    return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === 'name_desc') {
    return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortBy === 'price_asc') {
    return sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === 'price_desc') {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === 'popularity' || sortBy === 'popularity_desc') {
    return sortedProducts.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
  }

  return sortedProducts;
};

export const getFallbackCatalogProductsPage = ({
  products,
  page,
  sortBy,
  selectedBrands,
  maxPrice,
}: {
  products: IProduct[];
  page: number;
  sortBy: SortOption;
  selectedBrands: string[];
  maxPrice: number;
}) => {
  const filteredProducts = sortFallbackCatalogProducts(products, sortBy).filter((product) => {
    const matchesBrand = selectedBrands.length
      ? selectedBrands.some((brand) => product.name.toLowerCase().includes(brand.toLowerCase()))
      : true;
    const matchesPrice = product.price <= maxPrice;

    return matchesBrand && matchesPrice;
  });
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / CATALOG_PAGE_SIZE));
  const startIndex = (page - 1) * CATALOG_PAGE_SIZE;

  return {
    products: filteredProducts.slice(startIndex, startIndex + CATALOG_PAGE_SIZE),
    totalElements: filteredProducts.length,
    totalPages,
    first: page <= 1,
    last: page >= totalPages,
  };
};
