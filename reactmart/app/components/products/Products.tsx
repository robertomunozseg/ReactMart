'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useState, useMemo } from 'react';
import { Product } from '@/models/products';
import { formatNumber } from '@/app/utils';
import { addToCart } from '@/store/slices/cartSlice';

export default function Products() {
  const { items: products, loading, error } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  }, [products, searchTerm]);

  const dispatch = useAppDispatch();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center mb-3">
            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800">Error loading products</h3>
          </div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg
          className="w-24 h-24 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No products available
        </h3>
        <p className="text-gray-500">
          No products found in this category
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Products</h1>
        <div className="mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products"
            aria-label="Search products"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Products grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="w-24 h-24 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No products match your search
          </h3>
          <p className="text-gray-500">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              {/* Product image */}
              <div className="relative h-64 bg-gray-100">
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image
                  </div>
                )}

                {/* Discount badge */}
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                    -{product.discountPercentage.toFixed(0)}%
                  </span>
                )}
              </div>

              {/* Product info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="text-xs text-gray-400">{product.brand}</span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${formatNumber(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.stock !== undefined && (
                      <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => dispatch(addToCart(product))}
                      className="ml-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 transform hover:scale-105 active:scale-95 transition-transform duration-150"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
