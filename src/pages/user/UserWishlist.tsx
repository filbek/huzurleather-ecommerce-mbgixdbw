import React, { useState } from 'react';
import { products } from '../../data/products';
import { Product } from '../../types/Product';
import { useCart } from '../../contexts/CartContext';

const UserWishlist: React.FC = () => {
  // Mock wishlist data - in a real app, this would come from a context or API
  const [wishlistItems, setWishlistItems] = useState<Product[]>([
    products[0], // Classic Leather Briefcase
    products[2], // Handmade Leather Wallet
  ]);
  
  const { addToCart } = useCart();

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product.id);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        <p className="mt-1 text-sm text-gray-600">
          Items you have saved for later.
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((product) => (
            <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={product.images[0] || 'https://placehold.co/400x300/f5f3f0/8a7560?text=Leather+Product'}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  crossOrigin="anonymous"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <i className="bi bi-heart-fill text-red-500"></i>
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.material}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-star${i < Math.floor(product.rating) ? '-fill' : ''} text-yellow-400 text-sm`}
                      ></i>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 bg-leather-600 hover:bg-leather-700 text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="bi bi-bag-plus mr-2"></i>
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <i className="bi bi-trash text-gray-600"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-12 sm:px-6 text-center">
            <i className="bi bi-heart text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">
              Save items you love to your wishlist and shop them later.
            </p>
            <a
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-leather-600 hover:bg-leather-700"
            >
              Start Shopping
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserWishlist;
