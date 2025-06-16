import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import type { Database } from '../lib/supabase';

type Order = Database['public']['Tables']['orders']['Row'] & {
  items: Database['public']['Tables']['order_items']['Row'][];
};

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

interface OrderContextType {
  orders: Order[];
  isLoading: boolean;
  createOrder: (orderData: CreateOrderData) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<boolean>;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  getAllOrders: () => Order[];
  refreshOrders: () => Promise<void>;
}

interface CreateOrderData {
  items: Array<{
    productId: string;
    productName: string;
    productSku?: string;
    variantSelection?: any;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  notes?: string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      refreshOrders();
    } else {
      setOrders([]);
    }
  }, [isAuthenticated, user]);

  const refreshOrders = async () => {
    try {
      setIsLoading(true);

      let query = supabase
        .from('orders')
        .select(`
          *,
          items:order_items (*)
        `)
        .order('created_at', { ascending: false });

      // If not admin, only get user's orders
      if (user?.role !== 'admin' && user) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      setOrders(data || []);
    } catch (error) {
      console.error('Error refreshing orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateOrderNumber = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${dateStr}-${randomStr}`;
  };

  const createOrder = async (orderData: CreateOrderData): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setIsLoading(true);

      const orderNumber = generateOrderNumber();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: user.id,
          email: user.email,
          status: 'pending',
          payment_status: 'pending',
          subtotal: orderData.subtotal,
          tax_amount: orderData.taxAmount,
          shipping_amount: orderData.shippingAmount,
          discount_amount: orderData.discountAmount,
          total_amount: orderData.totalAmount,
          shipping_address: {
            first_name: orderData.shippingAddress.firstName,
            last_name: orderData.shippingAddress.lastName,
            company: orderData.shippingAddress.company,
            address_line_1: orderData.shippingAddress.address1,
            address_line_2: orderData.shippingAddress.address2,
            city: orderData.shippingAddress.city,
            state: orderData.shippingAddress.state,
            postal_code: orderData.shippingAddress.zipCode,
            country: orderData.shippingAddress.country,
            phone: orderData.shippingAddress.phone
          },
          billing_address: {
            first_name: orderData.billingAddress.firstName,
            last_name: orderData.billingAddress.lastName,
            company: orderData.billingAddress.company,
            address_line_1: orderData.billingAddress.address1,
            address_line_2: orderData.billingAddress.address2,
            city: orderData.billingAddress.city,
            state: orderData.billingAddress.state,
            postal_code: orderData.billingAddress.zipCode,
            country: orderData.billingAddress.country,
            phone: orderData.billingAddress.phone
          },
          payment_method: orderData.paymentMethod,
          notes: orderData.notes
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw orderError;
      }

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.productName,
        product_sku: item.productSku,
        variant_selection: item.variantSelection || {},
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total_price: item.unitPrice * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        throw itemsError;
      }

      // Create order status history
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert({
          order_id: order.id,
          status: 'pending',
          notes: 'Order created',
          created_by: user.id
        });

      if (historyError) {
        console.error('Error creating order history:', historyError);
      }

      await refreshOrders();
      return order.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<boolean> => {
    try {
      setIsLoading(true);

      const updateData: any = { status };
      
      // Set timestamps based on status
      if (status === 'shipped') {
        updateData.shipped_at = new Date().toISOString();
      } else if (status === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
      }

      const { error: updateError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (updateError) {
        console.error('Error updating order status:', updateError);
        return false;
      }

      // Add to status history
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          status,
          notes: `Status updated to ${status}`,
          created_by: user?.id
        });

      if (historyError) {
        console.error('Error creating status history:', historyError);
      }

      await refreshOrders();
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = (userId: string): Order[] => {
    return orders.filter(order => order.user_id === userId);
  };

  const getAllOrders = (): Order[] => {
    return orders;
  };

  const value: OrderContextType = {
    orders,
    isLoading,
    createOrder,
    updateOrderStatus,
    getOrderById,
    getUserOrders,
    getAllOrders,
    refreshOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
