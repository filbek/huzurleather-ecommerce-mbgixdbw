import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://naqqkxmetdjlrewwlwrb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcXFreG1ldGRqbHJld3dsd3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMzQzMDEsImV4cCI6MjA2NDYxMDMwMX0.H4T5IqNj-3nULH64k5lA4Ga6N-5RqQG4rxJw-hk8lj4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          role: 'user' | 'admin'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone?: string | null
          role?: 'user' | 'admin'
          avatar_url?: string | null
        }
        Update: {
          email?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          role?: 'user' | 'admin'
          avatar_url?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
        }
        Update: {
          name?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          short_description: string | null
          sku: string | null
          price: number
          compare_price: number | null
          cost_price: number | null
          category_id: string | null
          material: string | null
          weight: number | null
          dimensions: any | null
          features: string[] | null
          tags: string[] | null
          is_active: boolean
          is_featured: boolean
          seo_title: string | null
          seo_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string | null
          short_description?: string | null
          sku?: string | null
          price: number
          compare_price?: number | null
          cost_price?: number | null
          category_id?: string | null
          material?: string | null
          weight?: number | null
          dimensions?: any | null
          features?: string[] | null
          tags?: string[] | null
          is_active?: boolean
          is_featured?: boolean
          seo_title?: string | null
          seo_description?: string | null
        }
        Update: {
          name?: string
          description?: string | null
          short_description?: string | null
          sku?: string | null
          price?: number
          compare_price?: number | null
          cost_price?: number | null
          category_id?: string | null
          material?: string | null
          weight?: number | null
          dimensions?: any | null
          features?: string[] | null
          tags?: string[] | null
          is_active?: boolean
          is_featured?: boolean
          seo_title?: string | null
          seo_description?: string | null
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          alt_text: string | null
          sort_order: number
          is_primary: boolean
          created_at: string
        }
        Insert: {
          product_id: string
          image_url: string
          alt_text?: string | null
          sort_order?: number
          is_primary?: boolean
        }
        Update: {
          product_id?: string
          image_url?: string
          alt_text?: string | null
          sort_order?: number
          is_primary?: boolean
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          name: string
          value: string
          type: string
          price_adjustment: number
          sort_order: number
          created_at: string
        }
        Insert: {
          product_id: string
          name: string
          value: string
          type: string
          price_adjustment?: number
          sort_order?: number
        }
        Update: {
          product_id?: string
          name?: string
          value?: string
          type?: string
          price_adjustment?: number
          sort_order?: number
        }
      }
      inventory: {
        Row: {
          id: string
          product_id: string
          variant_combination: any | null
          quantity: number
          reserved_quantity: number
          low_stock_threshold: number
          track_inventory: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          product_id: string
          variant_combination?: any | null
          quantity?: number
          reserved_quantity?: number
          low_stock_threshold?: number
          track_inventory?: boolean
        }
        Update: {
          product_id?: string
          variant_combination?: any | null
          quantity?: number
          reserved_quantity?: number
          low_stock_threshold?: number
          track_inventory?: boolean
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          type: string
          first_name: string
          last_name: string
          company: string | null
          address_line_1: string
          address_line_2: string | null
          city: string
          state: string
          postal_code: string
          country: string
          phone: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          type?: string
          first_name: string
          last_name: string
          company?: string | null
          address_line_1: string
          address_line_2?: string | null
          city: string
          state: string
          postal_code: string
          country?: string
          phone?: string | null
          is_default?: boolean
        }
        Update: {
          user_id?: string
          type?: string
          first_name?: string
          last_name?: string
          company?: string | null
          address_line_1?: string
          address_line_2?: string | null
          city?: string
          state?: string
          postal_code?: string
          country?: string
          phone?: string | null
          is_default?: boolean
        }
      }
      carts: {
        Row: {
          id: string
          user_id: string
          session_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          session_id?: string | null
        }
        Update: {
          user_id?: string
          session_id?: string | null
        }
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string
          variant_selection: any | null
          quantity: number
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          cart_id: string
          product_id: string
          variant_selection?: any | null
          quantity?: number
          price: number
        }
        Update: {
          cart_id?: string
          product_id?: string
          variant_selection?: any | null
          quantity?: number
          price?: number
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          email: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          subtotal: number
          tax_amount: number
          shipping_amount: number
          discount_amount: number
          total_amount: number
          shipping_address: any
          billing_address: any
          payment_method: string | null
          payment_reference: string | null
          shipping_method: string | null
          tracking_number: string | null
          notes: string | null
          internal_notes: string | null
          shipped_at: string | null
          delivered_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          order_number: string
          user_id?: string | null
          email: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          subtotal: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount: number
          shipping_address: any
          billing_address: any
          payment_method?: string | null
          payment_reference?: string | null
          shipping_method?: string | null
          tracking_number?: string | null
          notes?: string | null
          internal_notes?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
        }
        Update: {
          order_number?: string
          user_id?: string | null
          email?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount?: number
          shipping_address?: any
          billing_address?: any
          payment_method?: string | null
          payment_reference?: string | null
          shipping_method?: string | null
          tracking_number?: string | null
          notes?: string | null
          internal_notes?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          product_sku: string | null
          variant_selection: any | null
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          order_id: string
          product_id?: string | null
          product_name: string
          product_sku?: string | null
          variant_selection?: any | null
          quantity: number
          unit_price: number
          total_price: number
        }
        Update: {
          order_id?: string
          product_id?: string | null
          product_name?: string
          product_sku?: string | null
          variant_selection?: any | null
          quantity?: number
          unit_price?: number
          total_price?: number
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          product_id: string
        }
        Update: {
          user_id?: string
          product_id?: string
        }
      }
    }
  }
}
