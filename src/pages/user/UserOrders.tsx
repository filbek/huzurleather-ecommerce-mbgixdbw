import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrderContext';

const UserOrders: React.FC = () => {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();
  
  const orders = user ? getUserOrders(user.id) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <p className="mt-1 text-sm text-gray-600">
          Check the status of recent orders, manage returns, and discover similar products.
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900">${order.totalAmount.toFixed(2)}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.product.images[0] || 'https://placehold.co/60x60/f5f3f0/8a7560?text=Product'}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-md"
                          crossOrigin="anonymous"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} • ${item.product.price.toFixed(2)} each
                          </p>
                          {item.selectedColor && (
                            <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                          )}
                          {item.selectedSize && (
                            <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
                  <div className="text-sm text-gray-600">
                    <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p>{order.shippingAddress.address1}</p>
                    {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Tracking */}
                {order.trackingNumber && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Tracking Information</h4>
                    <p className="text-sm text-gray-600">
                      Tracking Number: <span className="font-medium">{order.trackingNumber}</span>
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="border-t border-gray-200 pt-4 mt-4 flex space-x-4">
                  <button className="text-sm font-medium text-leather-600 hover:text-leather-500">
                    View Details
                  </button>
                  {order.status === 'delivered' && (
                    <button className="text-sm font-medium text-leather-600 hover:text-leather-500">
                      Buy Again
                    </button>
                  )}
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <button className="text-sm font-medium text-red-600 hover:text-red-500">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-12 sm:px-6 text-center">
            <i className="bi bi-bag text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">
              When you place your first order, it will appear here.
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

export default UserOrders;
