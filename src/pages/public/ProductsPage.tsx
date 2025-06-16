import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import DropdownFilter from '../../components/DropdownFilter';
import PriceRangeFilter from '../../components/PriceRangeFilter';
import ProductGrid from '../../components/ProductGrid';
import ProductModal from '../../components/ProductModal';

interface FilterOptions {
  categories: string[];
  materials: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
}

const ProductsPage: React.FC = () => {
  const { products, categories, isLoading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gridCols, setGridCols] = useState(3);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    materials: [],
    colors: [],
    sizes: [],
    priceRange: [0, 1000],
    inStockOnly: false,
  });

  // Extract filter options from products
  const materials = [...new Set(products.map(p => p.material).filter(Boolean))];
  const colors = [...new Set(products.flatMap(p => 
    p.variants?.filter(v => v.type === 'color').map(v => v.value) || []
  ))];
  const categoryNames = ['All', ...categories.map(c => c.name)];

  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories.length > 0 && !filters.categories.includes('All')) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category?.name || '')
      );
    }

    // Apply material filter
    if (filters.materials.length > 0) {
      filtered = filtered.filter(product =>
        filters.materials.includes(product.material || '')
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.variants?.some((variant: any) => 
          variant.type === 'color' && filters.colors.includes(variant.value)
        )
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => 
        product.inventory?.some((inv: any) => inv.quantity > 0)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, filters]);

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      materials: [],
      colors: [],
      sizes: [],
      priceRange: [0, 1000],
      inStockOnly: false,
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.materials.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000 ||
    filters.inStockOnly;

  // Transform products for ProductCard component
  const transformedProducts = filteredProducts.map(product => ({
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
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-leather-700 mx-auto mb-4"></div>
          <p className="text-leather-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Filter Bar */}
      <div className="bg-white border-b border-leather-200 py-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-wrap gap-2">
              <DropdownFilter
                title="Category"
                options={categoryNames}
                selectedOptions={filters.categories}
                onSelectionChange={(selected) => updateFilter('categories', selected)}
                icon="bi-grid-3x3-gap"
              />
              
              <DropdownFilter
                title="Material"
                options={materials}
                selectedOptions={filters.materials}
                onSelectionChange={(selected) => updateFilter('materials', selected)}
                icon="bi-leather"
              />
              
              <DropdownFilter
                title="Color"
                options={colors}
                selectedOptions={filters.colors}
                onSelectionChange={(selected) => updateFilter('colors', selected)}
                icon="bi-palette"
              />

              <PriceRangeFilter
                priceRange={filters.priceRange}
                onPriceChange={(range) => updateFilter('priceRange', range)}
              />

              <label className="flex items-center space-x-2 bg-white border border-leather-300 px-4 py-2 rounded-md hover:bg-leather-50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                  className="rounded border-leather-300 text-leather-600 focus:ring-leather-500"
                />
                <i className="bi bi-check-circle text-leather-600"></i>
                <span className="text-leather-700">In Stock</span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center space-x-2 bg-leather-100 border border-leather-300 px-4 py-2 rounded-md hover:bg-leather-200 transition-colors"
                >
                  <i className="bi bi-x-circle text-leather-600"></i>
                  <span className="text-leather-700">Clear All</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Grid View Options */}
              <div className="flex items-center space-x-2 bg-leather-50 rounded-md p-1">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded transition-colors ${
                    gridCols === 3 ? 'bg-white shadow-sm' : 'hover:bg-leather-100'
                  }`}
                  title="3 columns"
                >
                  <i className="bi bi-grid-3x3 text-leather-600"></i>
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded transition-colors ${
                    gridCols === 4 ? 'bg-white shadow-sm' : 'hover:bg-leather-100'
                  }`}
                  title="4 columns"
                >
                  <i className="bi bi-grid text-leather-600"></i>
                </button>
              </div>

              <select className="border border-leather-300 rounded-md px-3 py-2 focus:border-leather-500 focus:outline-none bg-white">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Best Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-semibold text-leather-900 mb-2">
            Premium Leather Collection
          </h1>
          <p className="text-leather-600 text-lg">
            {transformedProducts.length} {transformedProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={transformedProducts}
          onQuickView={handleQuickView}
          gridCols={gridCols}
        />
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ProductsPage;
