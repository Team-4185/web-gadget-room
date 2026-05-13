import { useEffect, useState } from 'react';
import { Container } from '@mui/material';

import { CatalogContent, CatalogFilters } from '@/components';
import { useCatalogState } from '@/core/hooks';
import { PRODUCTS } from '@/core/constants';
import { phonesService } from '@/core/services';
import type { IProduct } from '@/core/types';
import { mapApiPhoneToProduct } from '@/core/utils';

import './Catalog.css';

//TODO: Learn usePagination, useCatalogState hooks while working with pagination

export const Catalog = () => {
  const { activeItems, toggleItems, sliderValue, handleSliderChange } = useCatalogState();
  const [products, setProducts] = useState<IProduct[]>(PRODUCTS);

  useEffect(() => {
    if (import.meta.env.VITE_USE_TESTING_FALLBACK === 'true') return;

    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const phones = await phonesService.getAll(controller.signal);
        const mappedProducts = await Promise.all(
          phones.map(async (phone) => {
            const imageUrls = await phonesService.getImageObjectUrls(
              phone.images ?? [],
              controller.signal
            );

            return mapApiPhoneToProduct(phone, imageUrls[0]);
          })
        );

        if (!controller.signal.aborted) {
          setProducts(mappedProducts);
        }
      } catch {
        if (!controller.signal.aborted) {
          setProducts(PRODUCTS);
        }
      }
    };

    void loadProducts();

    return () => {
      controller.abort();
    };
  }, []);

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
            items={products}
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
