import './CatalogProductCardSkeleton.css';

export const CatalogProductCardSkeleton = () => (
  <div className="catalog-product-card-skeleton" aria-hidden="true">
    <div className="catalog-product-card-skeleton__media">
      <span className="catalog-product-card-skeleton__badge" />
      <span className="catalog-product-card-skeleton__image" />
    </div>
    <div className="catalog-product-card-skeleton__info">
      <span className="catalog-product-card-skeleton__title" />
      <span className="catalog-product-card-skeleton__price" />
    </div>
    <div className="catalog-product-card-skeleton__actions">
      <span className="catalog-product-card-skeleton__button" />
      <span className="catalog-product-card-skeleton__icon" />
    </div>
  </div>
);
