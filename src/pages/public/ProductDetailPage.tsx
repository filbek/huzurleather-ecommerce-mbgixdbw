import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-leather-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-leather-600 hover:text-leather-800">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    // Show success message or redirect
  };

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-leather-500 hover:text-leather-700">
                Home
              </Link>
            </li>
            <li>
              <i className="bi bi-chevron-right text-leather-400"></i>
            </li>
            <li>
              <Link to="/products" className="text-leather-500 hover:text-leather-700">
                Products
              </Link>
            </li>
            <li>
              <i className="bi bi-chevron-right text-leather-400"></i>
            </li>
            <li className="text-leather-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[selectedImage] || 'https://placehold.co/600x600/f5f3f0/8a7560?text=Leather+Product'}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
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
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-bold text-leather-900 mb-4">{product.name}</h1>
              <p className="text-leather-600 mb-4">{product.material}</p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`bi bi-star${i < Math.floor(product.rating) ? '-fill' : ''} text-yellow-400 text-lg`}
                    ></i>
                  ))}
                  <span className="text-leather-600 ml-2">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-4xl font-bold text-leather-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-leather-500 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-leather-700 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-semibold text-leather-900 mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-leather-700">
                    <i className="bi bi-check-circle-fill text-green-500 mr-3"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-leather-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md transition-colors ${
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
              <div className="mb-6">
                <h3 className="font-semibold text-leather-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md transition-colors ${
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
            <div className="mb-8">
              <h3 className="font-semibold text-leather-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border border-leather-300 rounded-md flex items-center justify-center hover:bg-leather-50 transition-colors"
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="text-xl font-semibold text-leather-900 w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border border-leather-300 rounded-md flex items-center justify-center hover:bg-leather-50 transition-colors"
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              {product.inStock ? (
                <div className="flex items-center text-green-600">
                  <i className="bi bi-check-circle-fill mr-2"></i>
                  <span className="font-medium">{product.stockCount} in stock</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <i className="bi bi-x-circle-fill mr-2"></i>
                  <span className="font-medium">Out of stock</span>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-leather-700 text-white py-4 px-8 rounded-md hover:bg-leather-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                <i className="bi bi-bag-plus mr-2"></i>
                Add to Cart
              </button>
              <button className="px-6 py-4 border border-leather-300 rounded-md hover:bg-leather-50 transition-colors">
                <i className="bi bi-heart text-leather-600 text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
