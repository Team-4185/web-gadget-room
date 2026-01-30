import { Box, Container } from '@mui/material';

import { CatalogContent, CatalogFilters } from '@/components';
import { useCatalogProducts, useCatalogState, usePagination } from '@/core/hooks';
import { ITEMS_PER_PAGE, PRODUCTS } from '@/core/constants';

import './Catalog.css';

export const Catalog = () => {
  const { sortBy, activeItems, toggleItems, sliderValue, handleSliderChange, handleSortChange } =
    useCatalogState();

  const filteredAndSortedProducts = useCatalogProducts({
    products: PRODUCTS,
    activeItems,
    sliderValue,
    sortBy,
  });

  const { currentPage, totalPages, currentItems, goPrev, goNext, goToPage } = usePagination(
    filteredAndSortedProducts,
    ITEMS_PER_PAGE
  );

  return (
    <section className="catalog">
      <Container disableGutters>
        <div className="catalog__layout">
          <CatalogFilters
            activeItems={activeItems}
            onToggle={toggleItems}
            sliderValue={sliderValue}
            onSliderChange={handleSliderChange}
          />

          <CatalogContent
            sortBy={sortBy}
            onSortChange={handleSortChange}
            items={currentItems}
            totalPages={totalPages}
            currentPage={currentPage}
            onPrev={goPrev}
            onNext={goNext}
            onPageChange={goToPage}
          />
        </div>
      </Container>
    </section>
  );
};
