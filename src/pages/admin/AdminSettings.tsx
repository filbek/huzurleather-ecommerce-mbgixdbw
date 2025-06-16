import React, { useState } from 'react';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    storeName: 'Luxe Leather',
    storeEmail: 'admin@luxeleather.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Leather Street, Craft City, CC 12345',
    currency: 'USD',
    taxRate: 8.5,
    shippingRate: 0,
    emailNotifications: true,
    smsNotifications: false,
    inventoryAlerts: true,
    lowStockThreshold: 5,
    autoBackup: true,
    maintenanceMode: false
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  const tabs = [
    { id: 'general', name: 'General', icon: 'bi-gear' },
    { id: 'payments', name: 'Payments', icon: 'bi-credit-card' },
    { id: 'shipping', name: 'Shipping', icon: 'bi-truck' },
    { id: 'notifications', name: 'Notifications', icon: 'bi-bell' },
    { id: 'security', name: 'Security', icon: 'bi-shield-check' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your store settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-leather-100 text-leather-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <i className={`${tab.icon} mr-3`}></i>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {activeTab === 'general' && (
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">General Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Name
                      </label>
                      <input
                        type="text"
                        value={settings.storeName}
                        onChange={(e) => handleSettingChange('storeName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-leather-500 focus:border-leather-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Email
                      </label>
                      <input
                        type="email"
                        value={settings.storeEmail}
                        onChange={(e) => handleSettingChange('storeEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-leather-500 focus:border-leather-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Phone
                      </label>
                      <input
                        type="tel"
                        value={settings.storePhone}
                        onChange={(e) => handleSettingChange('storePhone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-leather-500 focus:border-leather-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Address
                      </label>
                      <textarea
                        value={settings.storeAddress}
                        onChange={(e) => handleSettingChange('storeAddress', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-leather-500 focus:border-leather-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) => handleSettingChange('currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-leather-500 focus:border-leather-500"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.taxRate}
                        onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-leather-500 focus:border-leather-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Payment Settings</h3>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <i className="bi bi-credit-card text-xl text-gray-400 mr-3"></i>
                          <span className="font-medium">Credit Cards</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-leather-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-500">Accept Visa, Mastercard, American Express</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <i className="bi bi-paypal text-xl text-blue-500 mr-3"></i>
                          <span className="font-medium">PayPal</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-leather-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-500">Accept PayPal payments</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <i className="bi bi-apple text-xl text-gray-400 mr-3"></i>
                          <span className="font-medium">Apple Pay</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-leather-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-500">Accept Apple Pay payments</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Shipping Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Default Shipping Rate ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={settings.shippingRate}
                        onChange={(e) => handleSettingChange('shippingRate', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-leather-500 focus:border-leather-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">Set to 0 for free shipping</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium mb-3">Shipping Zones</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>United States</span>
                          <span className="text-sm text-gray-500">Free shipping over $100</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Canada</span>
                          <span className="text-sm text-gray-500">$15.00</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>International</span>
                          <span className="text-sm text-gray-500">$25.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Notification Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-500">Receive email notifications for orders and updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-leather-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-gray-500">Receive SMS notifications for urgent updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.smsNotifications}
                          onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-leather-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Inventory Alerts</h4>
                        <p className="text-sm text-gray-500">Get notified when products are running low</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.inventoryAlerts}
                          onChange={(e) => handleSettingChange('inventoryAlerts', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-leather-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Low Stock Threshold
                      </label>
                      <input
                        type="number"
                        value={settings.lowStockThreshold}
                        onChange={(e) => handleSettingChange('lowStockThreshold', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-leather-500 focus:border-leather-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">Alert when stock falls below this number</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Security Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto Backup</h4>
                        <p className="text-sm text-gray-500">Automatically backup your data daily</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.autoBackup}
                          onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-leather-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Maintenance Mode</h4>
                        <p className="text-sm text-gray-500">Put your store in maintenance mode</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.maintenanceMode}
                          onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-leather-600"></div>
                      </label>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium mb-3">Security Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          <i className="bi bi-key mr-2"></i>
                          Change Admin Password
                        </button>
                        <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          <i className="bi bi-download mr-2"></i>
                          Download Backup
                        </button>
                        <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          <i className="bi bi-shield-check mr-2"></i>
                          View Security Logs
                        </button>
                      </div>
                    </div>
                </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leather-500"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-leather-600 hover:bg-leather-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leather-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
