import axios from 'axios';
import { PRODUCTS_URL } from '@/config/constants';
import { ProductsResponse } from '@/models/products';

/**
 * Service to handle product-related requests
 */
export class ProductsService {

  static getallCategoriesUrl(): string {
    return `${PRODUCTS_URL}/categories`;
  }

  /**
   * Fetch products by category
   * @param categorySlug - Category slug
   * @returns Products response
   */
  static async getProductsByCategory(categorySlug: string): Promise<ProductsResponse> {
    const response = await axios.get<ProductsResponse>(
      `${PRODUCTS_URL}/category/${categorySlug}`
    );
    return response.data;
  }

}

