import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import type { Database } from '../lib/supabase';

type Product = Database['public']['Tables']['products']['Row'];
type CartItem = Database['public']['Tables']['cart_items']['Row'] & {
  product: Product & {
    images: { image_url: string; alt_text: string | null }[];
  };
};

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number, variantSelection?: any) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isInCart: (productId: string) => boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Fetch cart items when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshCart();
    } else {
      setItems([]);
    }
  }, [isAuthenticated, user]);

  const refreshCart = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      // First get or create cart
      let { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (cartError && cartError.code === 'PGRST116') {
        // Cart doesn't exist, create one
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert({ user_id: user.id })
          .select('id')
          .single();

        if (createError) {
          console.error('Error creating cart:', createError);
          return;
        }
        cart = newCart;
      } else if (cartError) {
        console.error('Error fetching cart:', cartError);
        return;
      }

      if (!cart) return;

      // Fetch cart items with product details
      const { data: cartItems, error: itemsError } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products (
            *,
            images:product_images (
              image_url,
              alt_text
            )
          )
        `)
        .eq('cart_id', cart.id)
        .order('created_at', { ascending: false });

      if (itemsError) {
        console.error('Error fetching cart items:', itemsError);
        return;
      }

      setItems(cartItems || []);
    } catch (error) {
      console.error('Error refreshing cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity = 1, variantSelection?: any) => {
    if (!user) return;

    try {
      setIsLoading(true);

      // Get product details
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (productError || !product) {
        console.error('Error fetching product:', productError);
        return;
      }

      // Get or create cart
      let { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (cartError && cartError.code === 'PGRST116') {
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert({ user_id: user.id })
          .select('id')
          .single();

        if (createError) {
          console.error('Error creating cart:', createError);
          return;
        }
        cart = newCart;
      }

      if (!cart) return;

      // Check if item already exists in cart
      const { data: existingItem, error: existingError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cart.id)
        .eq('product_id', productId)
        .eq('variant_selection', JSON.stringify(variantSelection || {}))
        .single();

      if (existingItem) {
        // Update quantity
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);

        if (updateError) {
          console.error('Error updating cart item:', updateError);
          return;
        }
      } else {
        // Add new item
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cart.id,
            product_id: productId,
            variant_selection: variantSelection || {},
            quantity,
            price: product.price
          });

        if (insertError) {
          console.error('Error adding to cart:', insertError);
          return;
        }
      }

      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setIsLoading(true);

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error removing from cart:', error);
        return;
      }

      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) {
        console.error('Error updating quantity:', error);
        return;
      }

      await refreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      const { data: cart } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (cart) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('cart_id', cart.id);

        if (error) {
          console.error('Error clearing cart:', error);
          return;
        }
      }

      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isInCart = (productId: string) => {
    return items.some(item => item.product_id === productId);
  };

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    refreshCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
