import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard';

const HomePage: React.FC = () => {
  const { getFeaturedProducts } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-leather-900 text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-leather-900 to-leather-800 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Premium Leather
            <span className="block text-leather-300">Craftsmanship</span>
          </h1>
          <p className="text-xl md:text-2xl text-leather-200 mb-8 max-w-3xl mx-auto">
            Discover our collection of handcrafted leather goods made with the finest materials and traditional techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-leather-600 hover:bg-leather-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Shop Collection
            </Link>
            <Link
              to="/products"
              className="border-2 border-leather-300 text-leather-300 hover:bg-leather-300 hover:text-leather-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-leather-900 mb-4">
              Why Choose Luxe Leather
            </h2>
            <p className="text-lg text-leather-600 max-w-2xl mx-auto">
              We are committed to delivering exceptional quality and craftsmanship in every piece.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-leather-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-award text-2xl text-leather-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-leather-900 mb-2">Premium Quality</h3>
              <p className="text-leather-600">
                Only the finest full-grain leather and materials are used in our products.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-leather-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-tools text-2xl text-leather-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-leather-900 mb-2">Handcrafted</h3>
              <p className="text-leather-600">
                Each piece is carefully handcrafted by skilled artisans with decades of experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-leather-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-shield-check text-2xl text-leather-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-leather-900 mb-2">Lifetime Warranty</h3>
              <p className="text-leather-600">
                We stand behind our products with a comprehensive lifetime warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-leather-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-leather-600">
              Discover our most popular leather goods
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.compare_price,
                    images: product.images?.map((img: any) => img.image_url) || [],
                    category: product.category?.name || '',
                    material: product.material || '',
                    colors: product.variants?.filter((v: any) => v.type === 'color').map((v: any) => v.value) || [],
                    sizes: product.variants?.filter((v: any) => v.type === 'size').map((v: any) => v.value) || [],
                    description: product.description || '',
                    features: product.features || [],
                    inStock: product.inventory?.some((inv: any) => inv.quantity > 0) || false,
                    stockCount: product.inventory?.reduce((sum: number, inv: any) => sum + inv.quantity, 0) || 0,
                    rating: 4.5,
                    reviews: Math.floor(Math.random() * 200) + 50
                  }}
                  onQuickView={() => {}}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-leather-700 hover:bg-leather-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-leather-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-leather-200 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and leather care tips.
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-leather-500"
            />
            <button className="bg-leather-600 hover:bg-leather-700 px-6 py-3 rounded-r-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
