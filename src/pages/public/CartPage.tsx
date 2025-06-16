import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <i className="bi bi-bag text-8xl text-leather-300 mb-6"></i>
          <h1 className="text-3xl font-bold text-leather-900 mb-4">Your cart is empty</h1>
          <p className="text-leather-600 mb-8">Start shopping to add items to your cart</p>
          <Link
            to="/products"
            className="bg-leather-700 hover:bg-leather-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-leather-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.images[0] || 'https://placehold.co/100x100/f5f3f0/8a7560?text=Product'}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                      crossOrigin="anonymous"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-leather-900">{item.product.name}</h3>
                      <p className="text-leather-600">{item.product.material}</p>
                      {item.selectedColor && (
                        <p className="text-sm text-leather-500">Color: {item.selectedColor}</p>
                      )}
                      {item.selectedSize && (
                        <p className="text-sm text-leather-500">Size: {item.selectedSize}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-leather-300 rounded-md flex items-center justify-center hover:bg-leather-50"
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-leather-300 rounded-md flex items-center justify-center hover:bg-leather-50"
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-leather-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-leather-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-leather-600">Subtotal</span>
                  <span className="text-leather-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-leather-600">Shipping</span>
                  <span className="text-leather-900">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-leather-600">Tax</span>
                  <span className="text-leather-900">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-leather-900">Total</span>
                    <span className="text-lg font-semibold text-leather-900">
                      ${(totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="w-full bg-leather-700 hover:bg-leather-800 text-white py-3 px-6 rounded-md font-semibold transition-colors text-center block"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                to="/products"
                className="w-full border border-leather-300 text-leather-700 hover:bg-leather-50 py-3 px-6 rounded-md font-semibold transition-colors text-center block mt-3"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
