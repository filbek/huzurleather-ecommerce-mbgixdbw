import React from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  gridCols: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onQuickView, gridCols }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <i className="bi bi-search text-8xl text-leather-300 mb-6"></i>
        <h3 className="text-2xl font-medium text-leather-600 mb-3">No products found</h3>
        <p className="text-leather-500 text-lg">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  const getGridClass = () => {
    switch (gridCols) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className={`grid ${getGridClass()} gap-8`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
