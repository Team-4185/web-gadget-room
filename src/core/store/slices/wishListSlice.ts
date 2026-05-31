import { favoritesService, phonesService } from '@/core/services';
import { createAppSlice } from '@/core/store/createAppSlice';
import type { ApiPhone, IProduct } from '@/core/types';
import { mapApiPhoneToProduct, toErrorMessage } from '@/core/utils';

type WishListState = {
  wishList: IProduct[];
  loading: boolean;
  error: string | null;
};

const initialState: WishListState = {
  wishList: [],
  loading: false,
  error: null,
};

const mapFavoritePhones = async (phones: ApiPhone[]): Promise<IProduct[]> => {
  const results = await Promise.allSettled(
    phones.map(async (phone) => {
      const imageUrls = await phonesService.getImageObjectUrls(phone.images ?? []);
      return mapApiPhoneToProduct(phone, imageUrls[0]);
    })
  );

  return results.flatMap((result) => (result.status === 'fulfilled' ? [result.value] : []));
};

const addLocalFavorite = (state: WishListState, product: IProduct) => {
  const existingProduct = state.wishList.find((item) => item.id === product.id);

  if (!existingProduct) {
    state.wishList.push({ ...product, amount: 1 });
  }
};

const removeLocalFavorite = (state: WishListState, productId: number) => {
  state.wishList = state.wishList.filter((item) => item.id !== productId);
};

const wishListSlice = createAppSlice({
  name: 'wishList',
  initialState,
  reducers: (create) => ({
    fetchFavorites: create.asyncThunk<IProduct[], void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        try {
          const favorites = await favoritesService.getFavorites();
          return await mapFavoritePhones(favorites);
        } catch (error) {
          return rejectWithValue(toErrorMessage(error, 'Failed to load favorites'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.wishList = action.payload;
        },
        rejected: (state, action) => {
          state.error = action.payload ?? 'Failed to load favorites';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    addFavorite: create.asyncThunk<IProduct[], IProduct, { rejectValue: string }>(
      async (product, { rejectWithValue }) => {
        try {
          const favorites = await favoritesService.addFavorite(product.id);
          return await mapFavoritePhones(favorites);
        } catch (error) {
          return rejectWithValue(toErrorMessage(error, 'Failed to add favorite'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.wishList = action.payload;
        },
        rejected: (state, action) => {
          addLocalFavorite(state, action.meta.arg);
          state.error = action.payload ?? 'Failed to add favorite';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    removeFavorite: create.asyncThunk<IProduct[], number, { rejectValue: string }>(
      async (phoneId, { rejectWithValue }) => {
        try {
          const favorites = await favoritesService.removeFavorite(phoneId);
          return await mapFavoritePhones(favorites);
        } catch (error) {
          return rejectWithValue(toErrorMessage(error, 'Failed to remove favorite'));
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.wishList = action.payload;
        },
        rejected: (state, action) => {
          removeLocalFavorite(state, action.meta.arg);
          state.error = action.payload ?? 'Failed to remove favorite';
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    addProductToWishList: create.reducer<IProduct>((state, action) => {
      addLocalFavorite(state, action.payload);
    }),
    removeProductFromWishList: create.reducer<number>((state, action) => {
      removeLocalFavorite(state, action.payload);
    }),
    increaseAmount: create.reducer<number>((state, action) => {
      const product = state.wishList.find((p) => p.id === action.payload);
      if (product) product.amount += 1;
    }),
    decreaseAmount: create.reducer<number>((state, action) => {
      const product = state.wishList.find((p) => p.id === action.payload);
      if (product && product.amount > 1) product.amount -= 1;
    }),
    clearWishList: create.reducer((state) => {
      state.wishList = [];
      state.error = null;
    }),
  }),
});

export const wishListActions = wishListSlice.actions;
export default wishListSlice.reducer;
