'use client';

import { useCategories } from '@/hooks/useCategories';
import { useState, useMemo } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchProductsByCategory } from '@/store/slices/productsSlice';
import './Sidebar.css';

export const Sidebar = () => {
  const { categories, loading, error } = useCategories();
  const [ selectedCategory, setSelectedCategory ] = useState<string | null>(null);
  const [ searchTerm, setSearchTerm ] = useState('');
  const dispatch = useAppDispatch();

  const filteredCategories = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(c =>
      c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );
  }, [categories, searchTerm]);

  const selectCategory = (slug: string) => {
    setSelectedCategory(slug);
    // Dispatch Redux thunk to fetch products by category
    dispatch(fetchProductsByCategory(slug));
  }

  if (loading) {
    return (
      <aside className="w-64 bg-white shadow-md h-screen sticky top-0 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-64 bg-white shadow-md h-screen sticky top-0 p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>
        <p className="text-red-500 text-sm">Error loading categories</p>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0 p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search categories"
          aria-label="Search categories"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <nav>
        <ul className="space-y-2">
          {filteredCategories.map((category) => {
            return (
              <li
                key={category.slug} 
                onClick={() => selectCategory(category.slug.toString())}
                className={`sidebar-item group ${selectedCategory === category.slug ? 'sidebar-item-active' : ''}`}
              >
                {category.name}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

