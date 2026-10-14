'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  LayoutGrid,
  ListFilter,
  ArrowUpDown,
  X,
  RotateCcw,
  Search,
  Filter,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { ToastProvider } from '@/components/Toast';
import { ShopProvider, useShop } from '@/context/ShopContext';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { BrandMarquee } from '@/components/BrandMarquee';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ShoeCard } from '@/components/ShoeCard';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { CustomizerModal } from '@/components/CustomizerModal';
import { WishlistModal } from '@/components/WishlistModal';
import { CompareModal } from '@/components/CompareModal';
import { SizeGuideModal } from '@/components/SizeGuideModal';
import { TechFeatures } from '@/components/TechFeatures';
import { Footer } from '@/components/Footer';
import { Shoe, ShoeBrand, ShoeCategory, FilterState } from '@/types/shoe';
import { INITIAL_SHOES } from '@/data/mockShoes';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  brand: 'All',
  minPrice: 50,
  maxPrice: 350,
  selectedSizes: [],
  selectedColors: [],
  cushioning: '',
  sortBy: 'featured',
  inStockOnly: false,
  badgeFilter: '',
};

function ShoeAppContent() {
  const {
    selectedShoeForModal,
    setSelectedShoeForModal,
  } = useShop();

  const [shoes, setShoes] = useState<Shoe[]>(INITIAL_SHOES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);

  // Fetch shoes from API on load
  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setShoes(data.data);
        }
      } catch (err) {
        console.warn('Using client mock shoes:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleCategorySelect = (category: ShoeCategory) => {
    setFilters((prev) => ({ ...prev, category }));
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrandSelect = (brand: ShoeBrand) => {
    setFilters((prev) => ({ ...prev, brand }));
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & Sort Logic
  const filteredShoes = useMemo(() => {
    let result = [...shoes];

    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (shoe) =>
          shoe.name.toLowerCase().includes(q) ||
          shoe.brand.toLowerCase().includes(q) ||
          shoe.category.toLowerCase().includes(q) ||
          shoe.description.toLowerCase().includes(q) ||
          shoe.technology.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters.category !== 'All') {
      result = result.filter((shoe) => shoe.category === filters.category);
    }

    if (filters.brand !== 'All') {
      result = result.filter((shoe) => shoe.brand === filters.brand);
    }

    if (filters.badgeFilter) {
      result = result.filter((shoe) => shoe.badge === filters.badgeFilter);
    }

    if (filters.cushioning) {
      result = result.filter((shoe) => shoe.cushioning === filters.cushioning);
    }

    if (filters.selectedSizes.length > 0) {
      result = result.filter((shoe) =>
        filters.selectedSizes.some((size) => shoe.sizes.includes(size))
      );
    }

    if (filters.inStockOnly) {
      result = result.filter((shoe) => shoe.stock > 0);
    }

    result = result.filter(
      (shoe) => shoe.price >= filters.minPrice && shoe.price <= filters.maxPrice
    );

    // Sorting
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'newest') {
      result.sort((a, b) => b.releaseYear - a.releaseYear);
    } else {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [shoes, filters]);

  const availableBrands: ShoeBrand[] = [
    'All',
    'Nike',
    'Adidas',
    'Air Jordan',
    'New Balance',
    'Asics',
    'Salomon',
    'On Running',
    'Puma',
  ];

  const featuredShoe = shoes.find((s) => s.isFeatured) || shoes[0];

  const activeFilterCount =
    (filters.category !== 'All' ? 1 : 0) +
    (filters.brand !== 'All' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0) +
    (filters.badgeFilter ? 1 : 0) +
    (filters.cushioning ? 1 : 0) +
    (filters.maxPrice < 350 ? 1 : 0) +
    filters.selectedSizes.length +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange('searchQuery', q)}
        selectedCategory={filters.category}
        onSelectCategory={handleCategorySelect}
      />

      {/* Featured Editorial Hero */}
      {featuredShoe && (
        <HeroBanner
          featuredShoe={featuredShoe}
          onExploreClick={() => {
            if (catalogRef.current) {
              catalogRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      )}

      {/* Brand Partnership Marquee */}
      <BrandMarquee
        onSelectBrand={handleBrandSelect}
        selectedBrand={filters.brand}
      />

      {/* Main Catalog Section */}
      <main ref={catalogRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Section Header Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Footwear Archive
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Showing <strong className="text-emerald-400">{filteredShoes.length}</strong> authenticated kicks
              {filters.category !== 'All' && ` in ${filters.category}`}
              {filters.brand !== 'All' && ` by ${filters.brand}`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200"
            >
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
                aria-label="Sort sneakers by"
                className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900 text-white">Featured Drops</option>
                <option value="newest" className="bg-slate-900 text-white">Newest Editions</option>
                <option value="price-asc" className="bg-slate-900 text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-slate-900 text-white">Price: High to Low</option>
                <option value="rating" className="bg-slate-900 text-white">Highest Rated ★</option>
              </select>
            </div>

            {/* Grid vs List View Toggle */}
            <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs text-slate-400 font-medium">Active filters:</span>
            {filters.category !== 'All' && (
              <button
                onClick={() => handleFilterChange('category', 'All')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Category: {filters.category}
                <X className="w-3 h-3 text-slate-400" />
              </button>
            )}
            {filters.brand !== 'All' && (
              <button
                onClick={() => handleFilterChange('brand', 'All')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Brand: {filters.brand}
                <X className="w-3 h-3 text-slate-400" />
              </button>
            )}
            {filters.badgeFilter && (
              <button
                onClick={() => handleFilterChange('badgeFilter', '')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Badge: {filters.badgeFilter}
                <X className="w-3 h-3 text-slate-400" />
              </button>
            )}
            {filters.selectedSizes.map((sz) => (
              <button
                key={sz}
                onClick={() =>
                  handleFilterChange(
                    'selectedSizes',
                    filters.selectedSizes.filter((s) => s !== sz)
                  )
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-xs text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
              >
                Size {sz}
                <X className="w-3 h-3 text-emerald-400" />
              </button>
            ))}
            {filters.maxPrice < 350 && (
              <button
                onClick={() => handleFilterChange('maxPrice', 350)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Under ${filters.maxPrice}
                <X className="w-3 h-3 text-slate-400" />
              </button>
            )}
            {filters.searchQuery && (
              <button
                onClick={() => handleFilterChange('searchQuery', '')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Query: "{filters.searchQuery}"
                <X className="w-3 h-3 text-slate-400" />
              </button>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-emerald-400 hover:underline font-semibold ml-1 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear all
            </button>
          </div>
        )}

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResultsCount={filteredShoes.length}
                availableBrands={availableBrands}
              />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/80 backdrop-blur-md animate-in fade-in">
              <div className="relative w-full max-w-xs bg-slate-900 border-r border-slate-800 p-5 overflow-y-auto h-full">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                  <h3 className="font-bold text-white text-sm">Refine Kicks</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded bg-slate-800 text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  totalResultsCount={filteredShoes.length}
                  availableBrands={availableBrands}
                />
              </div>
            </div>
          )}

          {/* Shoes Showcase (9 cols) */}
          <div className="lg:col-span-9">
            {filteredShoes.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-500">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">No kicks found matching your criteria</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Try clearing your active filters, adjusting the price slider, or searching with another keyword.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredShoes.map((shoe) => (
                  <ShoeCard key={shoe.id} shoe={shoe} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredShoes.map((shoe) => (
                  <ShoeCard key={shoe.id} shoe={shoe} viewMode="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Tech & Innovation Spotlight */}
      <TechFeatures />

      {/* Modals & Drawers */}
      <ProductDetailModal
        shoe={selectedShoeForModal}
        onClose={() => setSelectedShoeForModal(null)}
      />
      <CartDrawer />
      <CheckoutModal />
      <CustomizerModal />
      <WishlistModal allShoes={shoes} />
      <CompareModal />
      <SizeGuideModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <ShopProvider>
        <ShoeAppContent />
      </ShopProvider>
    </ToastProvider>
  );
}