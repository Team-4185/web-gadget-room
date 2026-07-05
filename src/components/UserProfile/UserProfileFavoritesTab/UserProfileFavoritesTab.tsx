import { Typography } from '@mui/material';

import { CircularProgress, UserFavoriteProductCard } from '@/components';
import type { IProduct } from '@/core/types';

type UserProfileFavoritesTabProps = {
  favorites: IProduct[];
  favoritesLoading: boolean;
  favoritesError: string | null;
  onProductClick: (productId: number) => void;
};

export const UserProfileFavoritesTab = ({
  favorites,
  favoritesLoading,
  favoritesError,
  onProductClick,
}: UserProfileFavoritesTabProps) => (
  <div className="user-profile__orders" aria-label="My Favorites">
    <div className="user-profile__orders-header">
      <Typography component="h2" sx={{ fontSize: '32px', fontWeight: 700, lineHeight: 1 }}>
        My Favorites
      </Typography>
    </div>

    <div className="user-profile__favorites-grid">
      {favoritesLoading ? <CircularProgress /> : null}
      {!favoritesLoading && favoritesError ? (
        <Typography component="p">{favoritesError}</Typography>
      ) : null}
      {!favoritesLoading && !favoritesError && !favorites.length ? (
        <Typography component="p">No favorites yet.</Typography>
      ) : null}
      {!favoritesLoading &&
        !favoritesError &&
        favorites.map((product) => (
          <UserFavoriteProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product.id)}
          />
        ))}
    </div>
  </div>
);
