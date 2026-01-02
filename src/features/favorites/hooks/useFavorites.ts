import type { Product } from '@/features/home/types/products.types';
import { toggleFavorite } from '@/redux/favorites.store';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCallback } from 'react';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  // Get all favorite products
  const getFavorites = useCallback(() => {
    return favorites;
  }, [favorites]);

  // Check if a product is in favorites
  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.some((product) => product.id === productId);
    },
    [favorites]
  );

  // Toggle a product in/out of favorites
  const toggleProductFavorite = useCallback(
    (product: Product) => {
      dispatch(toggleFavorite(product));
    },
    [dispatch]
  );

  // Get total number of favorites
  const favoritesCount = favorites.length;

  return {
    favorites,
    getFavorites,
    isFavorite,
    toggleProductFavorite,
    favoritesCount,
  };
};
