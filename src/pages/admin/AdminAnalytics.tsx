import React from 'react';
import { useOrders } from '../../contexts/OrderContext';
import { products } from '../../data/products';

const AdminAnalytics: React.FC = () => {
  const { getAllOrders } = useOrders();
  const orders = getAllOrders();
  
  // Calculate analytics data
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Monthly revenue (mock data for demo)
  const monthlyRevenue = [
    { month: 'Jan', revenue: 12400 },
    { month: 'Feb', revenue: 15600 },
    { month: 'Mar', revenue: 18200 },
    { month: 'Apr', revenue: 16800 },
    { month: 'May', revenue: 21500 },
    { month: 'Jun', revenue: 19300 },
  ];

  // Top selling products
  const topProducts = products.slice(0, 5).map(product => ({
    ...product,
    sales: Math.floor(Math.random() * 100) + 20
  }));

  // Order status distribution
  const orderStatusData = [
    { status: 'Delivered', count: orders.filter(o => o.status === 'delivered').length, color: 'bg-green-500' },
    { status: 'Shipped', count: orders.filter(o => o.status === 'shipped').length, color: 'bg-blue-500' },
    { status: 'Processing', count: orders.filter(o => o.status === 'processing').length, color: 'bg-yellow-500' },
    { status: 'Pending', count: orders.filter(o => o.status === 'pending').length, color: 'bg-gray-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-600">
          Track your store performance and sales metrics.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-green-500 p-3 rounded-md">
                  <i className="bi bi-currency-dollar text-white text-xl"></i>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">${totalRevenue.toFixed(2)}</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <i className="bi bi-arrow-up mr-1"></i>
                      12%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-blue-500 p-3 rounded-md">
                  <i className="bi bi-bag-check text-white text-xl"></i>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{totalOrders}</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <i className="bi bi-arrow-up mr-1"></i>
                      8%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-purple-500 p-3 rounded-md">
                  <i className="bi bi-graph-up text-white text-xl"></i>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg Order Value</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">${averageOrderValue.toFixed(2)}</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <i className="bi bi-arrow-up mr-1"></i>
                      5%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-orange-500 p-3 rounded-md">
                  <i className="bi bi-people text-white text-xl"></i>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">3.2%</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <i className="bi bi-arrow-up mr-1"></i>
                      0.3%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Monthly Revenue</h3>
            <div className="space-y-3">
              {monthlyRevenue.map((item, index) => (
                <div key={item.month} className="flex items-center">
                  <div className="w-12 text-sm text-gray-600">{item.month}</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-leather-600 h-2 rounded-full" 
                        style={{ width: `${(item.revenue / 25000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-20 text-sm font-medium text-gray-900 text-right">
                    ${item.revenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Order Status</h3>
            <div className="space-y-4">
              {orderStatusData.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                    <span className="text-sm text-gray-600">{item.status}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{item.count}</span>
                    <span className="text-xs text-gray-500">
                      ({totalOrders > 0 ? ((item.count / totalOrders) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Top Selling Products</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.images[0] || 'https://placehold.co/40x40/f5f3f0/8a7560?text=Product'}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md"
                          crossOrigin="anonymous"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${(product.price * product.sales).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
