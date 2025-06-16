import React, { useState } from 'react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Added to cart:', product.name);
  };

  return (
    <div 
      className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.images[currentImageIndex] || 'https://placehold.co/600x600/f5f3f0/8a7560?text=Leather+Product'}
          alt={product.name}
          className="w-full h-[37rem] object-cover group-hover:scale-105 transition-transform duration-300"
          crossOrigin="anonymous"
        />
        
        {!product.inStock && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
            Out of Stock
          </div>
        )}
        
        {product.originalPrice && (
          <div className="absolute top-4 right-4 bg-leather-700 text-white px-3 py-1 rounded-md text-sm font-medium">
            Sale
          </div>
        )}

        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center animate-fade-in">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-white text-leather-900 px-8 py-3 rounded-full font-medium hover:bg-leather-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              <i className="bi bi-bag-plus mr-2"></i>
              {product.inStock ? 'Quick Add' : 'Out of Stock'}
            </button>
          </div>
        )}

        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-leather-900 group-hover:text-leather-700 transition-colors line-clamp-2 text-xl">
            {product.name}
          </h3>
          <button className="text-leather-400 hover:text-red-500 transition-colors">
            <i className="bi bi-heart text-lg"></i>
          </button>
        </div>
        
        <p className="text-leather-600 mb-3 text-base">{product.material}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi bi-star${i < Math.floor(product.rating) ? '-fill' : ''} text-yellow-400 text-base`}
              ></i>
            ))}
            <span className="text-leather-600 ml-2">({product.reviews})</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-semibold text-leather-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-base text-leather-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full border border-leather-300"
                style={{ backgroundColor: color.toLowerCase() === 'brown' ? '#8B4513' : color.toLowerCase() === 'black' ? '#000' : color.toLowerCase() === 'tan' ? '#D2B48C' : '#8B4513' }}
                title={color}
              ></div>
            ))}
            {product.colors.length > 3 && (
              <span className="text-sm text-leather-600">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
