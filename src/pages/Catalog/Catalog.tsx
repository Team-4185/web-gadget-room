import { useMemo } from 'react';
import { Container } from '@mui/material';

import { CatalogContent, CatalogFilters } from '@/components';
import { BRANDS } from '@/core/constants';
import { useCatalogProducts, useCatalogState } from '@/core/hooks';
import { getCatalogApiSort, getSelectedCatalogBrands } from '@/core/utils';

import './Catalog.css';

export const Catalog = () => {
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
  } = useCatalogState();
  const selectedBrands = useMemo(
    () => getSelectedCatalogBrands(appliedActiveItems, BRANDS),
    [appliedActiveItems]
  );
  const apiSort = useMemo(() => getCatalogApiSort(sortBy), [sortBy]);
  const { products, totalPages, isLoading } = useCatalogProducts({
    currentPage,
    sortBy,
    brands: selectedBrands,
    sort: apiSort,
    maxPrice: appliedSliderValue,
  });

  return (
    <section className="catalog">
      <Container disableGutters>
        <div className="catalog__layout">
          <CatalogFilters
            brandOptions={BRANDS}
            activeItems={activeItems}
            onToggle={toggleItems}
            sliderValue={sliderValue}
            onSliderChange={handleSliderChange}
            onApply={applyFilters}
            onReset={resetFilters}
          />

          <CatalogContent
            items={products}
            sortBy={sortBy}
            totalPages={totalPages}
            currentPage={currentPage}
            isLoading={isLoading}
            onSortChange={handleSortChange}
            onPageChange={setCurrentPage}
          />
        </div>
      </Container>
    </section>
  );
};
