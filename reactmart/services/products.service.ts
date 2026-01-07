import { PRODUCTS_URL } from '@/config/constants';

/**
 * Service to handle product-related requests
 */
export class ProductsService {

  static getallCategoriesUrl(): string {
    return `${PRODUCTS_URL}/categories`;
  }

}

