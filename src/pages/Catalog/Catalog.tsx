import { Container } from '@mui/material';

import { CatalogContent, CatalogFilters } from '@/components';
import { useCatalogState } from '@/core/hooks';
import { PRODUCTS } from '@/core/constants';

import './Catalog.css';

//TODO: Learn usePagination, useCatalogState hooks while working with pagination

export const Catalog = () => {
  const { sortBy, activeItems, toggleItems, sliderValue, handleSliderChange, handleSortChange } =
    useCatalogState();

  // const { currentPage, totalPages, currentItems, goPrev, goNext, goToPage } = usePagination(
  //   PRODUCTS,
  //   12
  // );

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
            // sortBy={sortBy}
            // onSortChange={handleSortChange}
            items={PRODUCTS}
            // totalPages={totalPages}
            // currentPage={currentPage}
            // onPrev={goPrev}
            // onNext={goNext}
            // onPageChange={goToPage}
          />
        </div>
      </Container>
    </section>
  );
};
