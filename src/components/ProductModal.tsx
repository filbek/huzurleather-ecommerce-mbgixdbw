import React, { useState } from 'react';
import { Product } from '../types/Product';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    console.log('Added to cart:', {
      product: product.name,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white border-b border-leather-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-leather-900">Product Details</h2>
          <button
            onClick={onClose}
            className="text-leather-500 hover:text-leather-700 transition-colors"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images[selectedImage] || 'https://placehold.co/600x400/f5f3f0/8a7560?text=Leather+Product'}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                  crossOrigin="anonymous"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-leather-500' : 'border-leather-200'
                      }`}
                    >
                      <img
                        src={image || 'https://placehold.co/80x80/f5f3f0/8a7560?text=Leather'}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <h1 className="text-2xl font-serif font-semibold text-leather-900 mb-2">{product.name}</h1>
                <p className="text-leather-600 mb-2">{product.material}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-star${i < Math.floor(product.rating) ? '-fill' : ''} text-yellow-400`}
                      ></i>
                    ))}
                    <span className="text-leather-600 ml-2">({product.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl font-bold text-leather-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-leather-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-leather-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-medium text-leather-900 mb-2">Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-leather-700">
                      <i className="bi bi-check-circle-fill text-green-500 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-leather-900 mb-2">Color</h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-2 border rounded-md transition-colors ${
                          selectedColor === color
                            ? 'border-leather-500 bg-leather-50'
                            : 'border-leather-300 hover:border-leather-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-leather-900 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 border rounded-md transition-colors ${
                          selectedSize === size
                            ? 'border-leather-500 bg-leather-50'
                            : 'border-leather-300 hover:border-leather-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium text-leather-900 mb-2">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-leather-300 rounded-md flex items-center justify-center hover:bg-leather-50 transition-colors"
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="text-lg font-medium text-leather-900 w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-leather-300 rounded-md flex items-center justify-center hover:bg-leather-50 transition-colors"
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <i className="bi bi-check-circle-fill mr-2"></i>
                    <span>{product.stockCount} in stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <i className="bi bi-x-circle-fill mr-2"></i>
                    <span>Out of stock</span>
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-leather-700 text-white py-3 px-6 rounded-md hover:bg-leather-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <i className="bi bi-bag-plus mr-2"></i>
                  Add to Cart
                </button>
                <button className="px-4 py-3 border border-leather-300 rounded-md hover:bg-leather-50 transition-colors">
                  <i className="bi bi-heart text-leather-600"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
