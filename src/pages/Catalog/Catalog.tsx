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
  getCatalogApiSort,
  getSelectedCatalogBrands,
} from '@/core/utils';

import './Catalog.css';

export const Catalog = () => {
  const { authLoading, userId } = useAppSelector((state) => state.auth);
  const [contentScrollTrigger, setContentScrollTrigger] = useState(0);
  const [brandOptions, setBrandOptions] = useState(BRANDS);
  const [priceRange, setPriceRange] = useState({
    minPrice: CATALOG_MIN_PRICE,
    maxPrice: CATALOG_MAX_PRICE,
  });
  const {
    sortBy,
    activeItems,
    appliedActiveItems,
    toggleItems,
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
    maxPrice: priceRange.maxPrice,
  });
  const selectedBrands = useMemo(
    () => getSelectedCatalogBrands(appliedActiveItems, brandOptions),
    [appliedActiveItems, brandOptions]
  );
  const apiSort = useMemo(() => getCatalogApiSort(sortBy), [sortBy]);
  const { products, totalPages, isLoading } = useCatalogProducts({
    currentPage,
    sortBy,
    brands: selectedBrands,
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
            activeItems={activeItems}
            onToggle={toggleItems}
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
