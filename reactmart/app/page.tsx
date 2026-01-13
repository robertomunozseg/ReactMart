'use client';

import { Sidebar } from './components/sidebar/Sidebar';
import Products from './components/products/Products';

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Products />
      </main>
    </div>
  );
}
