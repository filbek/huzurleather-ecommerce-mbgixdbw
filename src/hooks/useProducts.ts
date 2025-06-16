import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Product = Database['public']['Tables']['products']['Row'] & {
  category: Database['public']['Tables']['categories']['Row'] | null;
  images: Database['public']['Tables']['product_images']['Row'][];
  variants: Database['public']['Tables']['product_variants']['Row'][];
  inventory: Database['public']['Tables']['inventory']['Row'][];
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories (*),
          images:product_images (*),
          variants:product_variants (*),
          inventory (*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories (*),
          images:product_images (*),
          variants:product_variants (*),
          inventory (*)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories (*),
          images:product_images (*),
          variants:product_variants (*),
          inventory (*)
        `)
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,material.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      return data || [];
    } catch (err) {
      console.error('Error searching products:', err);
      return [];
    }
  };

  const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories (*),
          images:product_images (*),
          variants:product_variants (*),
          inventory (*)
        `)
        .eq('is_active', true)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching products by category:', err);
      return [];
    }
  };

  const getFeaturedProducts = async (): Promise<Product[]> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories (*),
          images:product_images (*),
          variants:product_variants (*),
          inventory (*)
        `)
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(8);

      if (fetchError) {
        throw fetchError;
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching featured products:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    products,
    categories,
    isLoading,
    error,
    fetchProducts,
    getProductById,
    searchProducts,
    getProductsByCategory,
    getFeaturedProducts
  };
};
