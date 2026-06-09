import { useEffect, useMemo, useState } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';

import { CatalogContent, CatalogFilters } from '@/components';
import { BRANDS, CATALOG_MAX_PRICE, CATALOG_MIN_PRICE } from '@/core/constants';
import { phonesService } from '@/core/services';
import { useCatalogProducts, useCatalogState } from '@/core/hooks';
import { useAppSelector } from '@/core/store';
import {
  buildCatalogBrandOptions,
  buildCatalogColorOptions,
  buildCatalogStorageOptions,
  getCatalogApiSort,
  getSelectedCatalogOptionValues,
  getSelectedCatalogBrands,
} from '@/core/utils';
import type { ICheckboxOption } from '@/core/types';

import './Catalog.css';

export const Catalog = () => {
  const { authLoading, userId } = useAppSelector((state) => state.auth);
  const [contentScrollTrigger, setContentScrollTrigger] = useState(0);
  const [brandOptions, setBrandOptions] = useState(BRANDS);
  const [colorOptions, setColorOptions] = useState<ICheckboxOption[]>([]);
  const [storageOptions, setStorageOptions] = useState<ICheckboxOption[]>([]);
  const [priceRange, setPriceRange] = useState({
    minPrice: CATALOG_MIN_PRICE,
    maxPrice: CATALOG_MAX_PRICE,
  });
  const {
    sortBy,
    activeItems,
    appliedActiveItems,
    activeColorItems,
    appliedActiveColorItems,
    activeStorageItems,
    appliedActiveStorageItems,
    toggleItems,
    toggleColorItems,
    toggleStorageItems,
    sliderValue,
    appliedSliderValue,
    handleSliderChange,
    handleSortChange,
    applyFilters,
    resetFilters,
    currentPage,
    setCurrentPage,
  } = useCatalogState({
    brandOptions,
    colorOptions,
    storageOptions,
    maxPrice: priceRange.maxPrice,
  });
  const selectedBrands = useMemo(
    () => getSelectedCatalogBrands(appliedActiveItems, brandOptions),
    [appliedActiveItems, brandOptions]
  );
  const selectedColors = useMemo(
    () => getSelectedCatalogOptionValues(appliedActiveColorItems, colorOptions),
    [appliedActiveColorItems, colorOptions]
  );
  const selectedStorageCapacities = useMemo(
    () => getSelectedCatalogOptionValues(appliedActiveStorageItems, storageOptions),
    [appliedActiveStorageItems, storageOptions]
  );
  const apiSort = useMemo(() => getCatalogApiSort(sortBy), [sortBy]);
  const { products, totalPages, isLoading } = useCatalogProducts({
    currentPage,
    sortBy,
    brands: selectedBrands,
    colors: selectedColors,
    storageCapacities: selectedStorageCapacities,
    sort: apiSort,
    minPrice: priceRange.minPrice,
    maxPrice: appliedSliderValue,
    enabled: !authLoading && Boolean(userId),
  });

  useEffect(() => {
    if (authLoading || !userId) return;

    const controller = new AbortController();

    const loadFilterMetadata = async () => {
      try {
        const metadata = await phonesService.getFilterMetadata(controller.signal);
        const nextBrandOptions = buildCatalogBrandOptions(metadata.brands);

        if (nextBrandOptions.length) {
          setBrandOptions(nextBrandOptions);
        }

        setColorOptions(buildCatalogColorOptions(metadata.colors));
        setStorageOptions(buildCatalogStorageOptions(metadata.storageCapacities));
        setPriceRange({
          minPrice: Number(metadata.priceRange?.minPrice ?? CATALOG_MIN_PRICE),
          maxPrice: Number(metadata.priceRange?.maxPrice ?? CATALOG_MAX_PRICE),
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;
      }
    };

    loadFilterMetadata();

    return () => controller.abort();
  }, [authLoading, userId]);

  const handleApplyFilters = () => {
    applyFilters();
    setContentScrollTrigger((prev) => prev + 1);
  };

  const handleResetFilters = () => {
    resetFilters();
    setContentScrollTrigger((prev) => prev + 1);
  };

  return (
    <section className="catalog">
      <Container disableGutters>
        <div className="catalog__layout">
          <CatalogFilters
            brandOptions={brandOptions}
            colorOptions={colorOptions}
            storageOptions={storageOptions}
            activeItems={activeItems}
            activeColorItems={activeColorItems}
            activeStorageItems={activeStorageItems}
            onToggle={toggleItems}
            onToggleColor={toggleColorItems}
            onToggleStorage={toggleStorageItems}
            sliderValue={sliderValue}
            minPrice={priceRange.minPrice}
            maxPrice={priceRange.maxPrice}
            onSliderChange={handleSliderChange}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />

          <CatalogContent
            items={products}
            sortBy={sortBy}
            totalPages={totalPages}
            currentPage={currentPage}
            scrollTrigger={contentScrollTrigger}
            isLoading={isLoading}
            onSortChange={handleSortChange}
            onPageChange={setCurrentPage}
          />
        </div>
      </Container>
    </section>
  );
};
