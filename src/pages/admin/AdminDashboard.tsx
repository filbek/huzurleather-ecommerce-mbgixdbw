import React from 'react';
import { useOrders } from '../../contexts/OrderContext';
import { products } from '../../data/products';

const AdminDashboard: React.FC = () => {
  const { getAllOrders } = useOrders();
  const orders = getAllOrders();
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalProducts = products.length;
  const totalCustomers = new Set(orders.map(order => order.userId)).size;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: 'bi-currency-dollar',
      color: 'bg-green-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Total Orders',
      value: orders.length,
      icon: 'bi-bag-check',
      color: 'bg-blue-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Total Products',
      value: totalProducts,
      icon: 'bi-box-seam',
      color: 'bg-purple-500',
      change: '+2%',
      changeType: 'increase'
    },
    {
      name: 'Total Customers',
      value: totalCustomers,
      icon: 'bi-people',
      color: 'bg-orange-500',
      change: '+15%',
      changeType: 'increase'
    }
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to your admin dashboard. Here is an overview of your store.
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
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <i className={`bi bi-arrow-${item.changeType === 'increase' ? 'up' : 'down'} mr-1`}></i>
                        {item.change}
                      </div>
                    </dd>
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
              <a
                href="/admin/orders"
                className="text-sm font-medium text-leather-600 hover:text-leather-500"
              >
                View all
              </a>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
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
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <a
                href="/admin/products"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="bi bi-plus-circle text-leather-600 text-xl mr-3"></i>
                <div>
                  <p className="font-medium text-gray-900">Add New Product</p>
                  <p className="text-sm text-gray-500">Create a new product listing</p>
                </div>
              </a>
              
              <a
                href="/admin/orders"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="bi bi-bag-check text-leather-600 text-xl mr-3"></i>
                <div>
                  <p className="font-medium text-gray-900">Manage Orders</p>
                  <p className="text-sm text-gray-500">Process and track orders</p>
                </div>
              </a>
              
              <a
                href="/admin/customers"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="bi bi-people text-leather-600 text-xl mr-3"></i>
                <div>
                  <p className="font-medium text-gray-900">View Customers</p>
                  <p className="text-sm text-gray-500">Manage customer accounts</p>
                </div>
              </a>
              
              <a
                href="/admin/analytics"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="bi bi-graph-up text-leather-600 text-xl mr-3"></i>
                <div>
                  <p className="font-medium text-gray-900">View Analytics</p>
                  <p className="text-sm text-gray-500">Check sales and performance</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {pendingOrders > 0 && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="bi bi-exclamation-triangle text-yellow-400 text-xl"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Attention needed
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You have {pendingOrders} pending order{pendingOrders !== 1 ? 's' : ''} that need processing.
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <a
                    href="/admin/orders"
                    className="bg-yellow-50 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100"
                  >
                    View orders
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
