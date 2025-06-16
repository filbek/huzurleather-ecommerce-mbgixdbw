import React, { useState } from 'react';
import { Address } from '../../contexts/OrderContext';

const UserAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<(Address & { id: string; isDefault: boolean })[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      company: '',
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1234567891',
      isDefault: true
    }
  ]);
  
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Address>({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingId 
          ? { ...formData, id: editingId, isDefault: addr.isDefault }
          : addr
      ));
      setEditingId(null);
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now().toString(),
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, newAddress]);
      setIsAddingNew(false);
    }
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      phone: ''
    });
  };

  const handleEdit = (address: Address & { id: string; isDefault: boolean }) => {
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company || '',
      address1: address.address1,
      address2: address.address2 || '',
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone || ''
    });
    setEditingId(address.id);
    setIsAddingNew(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      phone: ''
    });
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Addresses</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your shipping and billing addresses.
            </p>
          </div>
          {!isAddingNew && (
            <button
              onClick={() => setIsAddingNew(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-leather-600 hover:bg-leather-700"
            >
              <i className="bi bi-plus mr-2"></i>
              Add Address
            </button>
          )}
        </div>
      </div>

      {/* Add/Edit Address Form */}
      {isAddingNew && (
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address1" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address1"
                    id="address1"
                    required
                    value={formData.address1}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address2" className="block text-sm font-medium text-gray-700">
                    Apartment, suite, etc. (Optional)
                  </label>
                  <input
                    type="text"
                    name="address2"
                    id="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather-500 focus:border-leather-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-leather-600 hover:bg-leather-700"
                >
                  {editingId ? 'Update Address' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Address List */}
      <div className="space-y-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {address.firstName} {address.lastName}
                    </h3>
                    {address.isDefault && (
                      <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Default
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    {address.company && <p>{address.company}</p>}
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.country}</p>
                    {address.phone && <p>{address.phone}</p>}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-sm font-medium text-leather-600 hover:text-leather-500"
                  >
                    Edit
                  </button>
                  {!address.isDefault && (
                    <>
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="text-sm font-medium text-leather-600 hover:text-leather-500"
                      >
                        Set Default
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && !isAddingNew && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-12 sm:px-6 text-center">
            <i className="bi bi-geo-alt text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
            <p className="text-gray-500 mb-6">
              Add an address to make checkout faster and easier.
            </p>
            <button
              onClick={() => setIsAddingNew(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-leather-600 hover:bg-leather-700"
            >
              <i className="bi bi-plus mr-2"></i>
              Add Your First Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAddresses;
