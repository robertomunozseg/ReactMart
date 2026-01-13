import useAxios from 'axios-hooks';
import { ProductsService } from '@/services/products.service';
import { Category } from '@/models/categories';

/**
 * Custom hook to fetch categories using axios-hooks
 */
export function useCategories() {
  const url = ProductsService.getallCategoriesUrl();
  const [{ data, loading, error }, refetch] = useAxios<Category[]>(url);

  return {
    categories: data || [],
    loading,
    error,
    refetch,
  };
}

