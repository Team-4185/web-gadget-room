import { Container } from '@mui/material';

import { CatalogContent, CatalogFilters } from '@/components';
import { useCatalogProducts, useCatalogState } from '@/core/hooks';

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
  } = useCatalogState();
  const { products, currentPage, totalPages, isLoading, setCurrentPage } = useCatalogProducts({
    sortBy,
    activeItems: appliedActiveItems,
    maxPrice: appliedSliderValue,
  });

  return (
    <section className="catalog">
      <Container disableGutters>
        <div className="catalog__layout">
          <CatalogFilters
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
