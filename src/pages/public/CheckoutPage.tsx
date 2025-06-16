import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useOrders, Address } from '../../contexts/OrderContext';
import { useAuth } from '../../contexts/AuthContext';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: user?.phone || ''
  });
  
  const [billingAddress, setBillingAddress] = useState<Address>(shippingAddress);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleShippingChange = (field: keyof Address, value: string) => {
    const updated = { ...shippingAddress, [field]: value };
    setShippingAddress(updated);
    if (sameAsShipping) {
      setBillingAddress(updated);
    }
  };

  const handleBillingChange = (field: keyof Address, value: string) => {
    setBillingAddress({ ...billingAddress, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsProcessing(true);
    
    try {
      const orderId = await createOrder({
        userId: user.id,
        items,
        totalAmount: totalPrice * 1.08, // Including tax
        status: 'pending',
        shippingAddress,
        billingAddress: sameAsShipping ? shippingAddress : billingAddress,
        paymentMethod
      });
      
      clearCart();
      navigate(`/dashboard/orders`);
    } catch (error) {
      console.error('Order creation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-leather-900 mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-leather-900 mb-4">Shipping Address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-leather-700 mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.firstName}
                      onChange={(e) => handleShippingChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-leather-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.lastName}
                      onChange={(e) => handleShippingChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-leather-700 mb-1">Company (Optional)</label>
                    <input
                      type="text"
                      value={shippingAddress.company}
                      onChange={(e) => handleShippingChange('company', e.target.value)}
                      className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-leather-700 mb-1">Address</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.address1}
                      onChange={(e) => handleShippingChange('address1', e.target.value)}
                      className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-leather-700 mb-1">Apartment, suite, etc. (Optional)</label>
                    <input
                      type="text"
                      value={shippingAddress.address2}
                      onChange={(e) => handleShippingChange('address2', e.target.value)}
                      className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-leather-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-leather-700 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => handleShippingChange('state', e.target.value)}
                      className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-leather-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.zipCode}
                      onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-leather-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => handleShippingChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-leather-900">Billing Address</h2>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(e) => {
                        setSameAsShipping(e.target.checked);
                        if (e.target.checked) {
                          setBillingAddress(shippingAddress);
                        }
                      }}
                      className="rounded border-leather-300 text-leather-600 focus:ring-leather-500 mr-2"
                    />
                    <span className="text-sm text-leather-700">Same as shipping address</span>
                  </label>
                </div>
                
                {!sameAsShipping && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-leather-700 mb-1">First Name</label>
                      <input
                        type="text"
                        required
                        value={billingAddress.firstName}
                        onChange={(e) => handleBillingChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-leather-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        required
                        value={billingAddress.lastName}
                        onChange={(e) => handleBillingChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                      />
                    </div>
                    {/* Add other billing address fields similar to shipping */}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-leather-900 mb-4">Payment Method</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-leather-600 focus:ring-leather-500"
                    />
                    <span className="ml-2">Credit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-leather-600 focus:ring-leather-500"
                    />
                    <span className="ml-2">PayPal</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-leather-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.images[0] || 'https://placehold.co/60x60/f5f3f0/8a7560?text=Product'}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-md"
                        crossOrigin="anonymous"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-leather-900">{item.product.name}</p>
                        <p className="text-xs text-leather-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-leather-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
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
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-leather-700 hover:bg-leather-800 text-white py-3 px-6 rounded-md font-semibold transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
