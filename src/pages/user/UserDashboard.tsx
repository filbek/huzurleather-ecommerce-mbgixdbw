import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrderContext';
import { useCart } from '../../contexts/CartContext';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();
  const { totalItems } = useCart();
  
  const userOrders = user ? getUserOrders(user.id) : [];
  const recentOrders = userOrders.slice(0, 3);

  const stats = [
    {
      name: 'Total Orders',
      value: userOrders.length,
      icon: 'bi-bag-check',
      color: 'bg-blue-500'
    },
    {
      name: 'Cart Items',
      value: totalItems,
      icon: 'bi-bag',
      color: 'bg-green-500'
    },
    {
      name: 'Wishlist',
      value: 0,
      icon: 'bi-heart',
      color: 'bg-red-500'
    },
    {
      name: 'Addresses',
      value: 1,
      icon: 'bi-geo-alt',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
        <p className="mt-1 text-sm text-gray-600">
          Here is what is happening with your account today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${item.color} p-3 rounded-md`}>
                    <i className={`${item.icon} text-white text-xl`}></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="text-lg font-medium text-gray-900">{item.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
              <Link
                to="/dashboard/orders"
                className="text-sm font-medium text-leather-600 hover:text-leather-500"
              >
                View all
              </Link>
            </div>
            
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${order.totalAmount.toFixed(2)}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <i className="bi bi-bag text-4xl text-gray-300 mb-2"></i>
                <p className="text-gray-500">No orders yet</p>
                <Link
                  to="/products"
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-leather-600 hover:bg-leather-700"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Link
                to="/dashboard/profile"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="bi bi-person text-leather-600 text-xl mr-3"></i>
                <div>
                  <p className="font-medium text-gray-900">Update Profile</p>
                  <p className="text-sm text-gray-500">Manage your personal information</p>
                </div>
              </Link>
              
              <Link
                to="/dashboard/addresses"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="bi bi-geo-alt text-leather-600 text-xl mr-3"></i>
                <div>
                  <p className="font-medium text-gray-900">Manage Addresses</p>
                  <p className="text-sm text-gray-500">Add or edit shipping addresses</p>
                </div>
              </Link>
              
              <Link
                to="/dashboard/wishlist"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="bi bi-heart text-leather-600 text-xl mr-3"></i>
                <div>
                  <p className="font-medium text-gray-900">View Wishlist</p>
                  <p className="text-sm text-gray-500">See your saved items</p>
                </div>
              </Link>
              
              <Link
                to="/products"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="bi bi-bag text-leather-600 text-xl mr-3"></i>
                <div>
                  <p className="font-medium text-gray-900">Continue Shopping</p>
                  <p className="text-sm text-gray-500">Browse our leather collection</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
