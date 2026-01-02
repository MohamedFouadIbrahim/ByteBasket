import type { Product } from '@/features/home/types/products.types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProducts } from '@/redux/products.store';
import { useCallback, useEffect } from 'react';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);

  // Fetch products on screen mount
  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading]);

  // Manual refresh function
  const refreshProducts = useCallback(async () => {
    await dispatch(fetchProducts());
  }, [dispatch]);

  // Search products by name
  const searchProducts = useCallback(
    (query: string): Product[] => {
      if (!query.trim()) return products;

      const lowerQuery = query.toLowerCase();
      return products.filter((product) =>
        product.name.toLowerCase().includes(lowerQuery)
      );
    },
    [products]
  );

  return {
    products,
    loading,
    error,
    refreshProducts,
    searchProducts,
    productsCount: products.length,
  };
};
