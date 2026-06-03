import { useEffect, useMemo, useState } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';

import { CatalogContent, CatalogFilters } from '@/components';
import { BRANDS } from '@/core/constants';
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
  } = useCatalogState(brandOptions);
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
    maxPrice: appliedSliderValue,
    enabled: !authLoading && Boolean(userId),
  });

  useEffect(() => {
    if (authLoading || !userId) return;

    const controller = new AbortController();

    const loadBrands = async () => {
      try {
        const brands = await phonesService.getBrands(controller.signal);
        const nextBrandOptions = buildCatalogBrandOptions(brands);

        if (nextBrandOptions.length) {
          setBrandOptions(nextBrandOptions);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;
      }
    };

    loadBrands();

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
