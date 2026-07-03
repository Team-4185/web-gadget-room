import { Typography, Container } from '@mui/material';

import { ProductCard } from '@/components';
import type { IProduct } from '@/core/types';

import './NewArrivalsSection.css';

type Props = {
  products: IProduct[];
  onOpenProduct: (product: IProduct) => void;
};

export const NewArrivalsSection = ({ products, onOpenProduct }: Props) => {
  return (
    <section className="new-arrivals" aria-label="New Arrivals">
      <Container disableGutters>
        <Typography variant="h3" component="h2" sx={{ fontWeight: 700, lineHeight: 1 }}>
          New Arrivals
        </Typography>

        <div className="new-arrivals__list">
          {products
            .filter((product) => product.id)
            .slice(0, 4)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="new-arrivals__product-card"
                likeClassName="new-arrivals__product-card-like"
                showBadge={false}
                showVariantInfo={false}
                onClick={() => onOpenProduct(product)}
              />
            ))}
        </div>
      </Container>
    </section>
  );
};
