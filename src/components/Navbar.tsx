'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  Menu,
  X,
  Layers,
  Palette,
  ChevronDown,
} from 'lucide-react';
import { useShop, CurrencyType } from '@/context/ShopContext';
import { ShoeCategory } from '@/types/shoe';

interface NavbarProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  selectedCategory: ShoeCategory;
  onSelectCategory: (category: ShoeCategory) => void;
}

export function Navbar({
  onSearchChange,
  searchQuery,
  selectedCategory,
  onSelectCategory,
}: NavbarProps) {
  const {
    cartCount,
    subtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    compareList,
    setIsCompareOpen,
    setIsCustomizerOpen,
    currency,
    setCurrency,
    formatPrice,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories: ShoeCategory[] = ['All', 'Running', 'Basketball', 'Lifestyle', 'Trail', 'Training', 'Skate'];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 border-b border-emerald-500/20 px-4 py-1.5 text-xs text-center font-medium flex items-center justify-center gap-3 text-slate-300">
        <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold uppercase tracking-wider text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
          <Flame className="w-3.5 h-3.5 animate-pulse" />
          Season Drop
        </span>
        <span className="hidden sm:inline">Use code <strong className="text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">KICKS20</strong> for 20% off all orders</span>
        <span className="text-slate-500 hidden sm:inline">•</span>
        <span>Free Worldwide Express Shipping over $150</span>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectCategory('All');
                onSearchChange('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                {/* Stylized Sneaker Icon */}
                <svg className="w-6 h-6 text-slate-950 fill-current" viewBox="0 0 24 24">
                  <path d="M21.5 14.5c-.83-.83-2.02-1.28-3.23-1.23l-3.27.13-1.63-3.26c-.37-.74-1.12-1.21-1.95-1.23L4.7 8.7C3.12 8.65 1.8 9.94 1.76 11.53c-.02.66.19 1.3.59 1.82L4 15.5V19c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2.5c0-.75-.3-1.47-.83-2zM4 17.5l-1.3-1.74c-.2-.26-.3-.58-.29-.91.02-.72.6-1.3 1.32-1.28l6.19.12-1.92 3.81H4zm16 1.5H10l1.5-3h6.77c.67-.03 1.33.22 1.79.68.28.28.44.66.44 1.07V19z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-white uppercase font-sans">
                    SOLE<span className="text-emerald-400">VAULT</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest hidden md:inline">
                    PRO
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase hidden sm:block">
                  Next-Gen Sneaker Studio
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-md mx-2 hidden lg:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search kicks, models, carbon plates, brands... (Press '/' to search)"
                className="w-full bg-slate-900/90 text-sm text-slate-200 placeholder-slate-500 pl-10 pr-10 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 3D Bespoke Customizer Button */}
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold tracking-wide transition-all group"
            >
              <Palette className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span>3D Bespoke Lab</span>
            </button>

            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 transition-colors"
                title="Switch Currency"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50">
                  {(['USD', 'EUR', 'GBP', 'JPY'] as CurrencyType[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-800 transition-colors flex items-center justify-between ${
                        currency === curr ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-300'
                      }`}
                    >
                      <span>{curr}</span>
                      {currency === curr && <span className="text-[10px] text-emerald-400">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Compare Button */}
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 transition-colors"
                title="Compare Shoes"
              >
                <Layers className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Saved Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-400 fill-rose-500/20' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 ? (
                <span className="bg-slate-950 text-emerald-400 font-extrabold text-[11px] px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              ) : (
                <span className="bg-emerald-600/30 text-slate-950 font-bold text-[11px] px-1.5 py-0.5 rounded-full">
                  0
                </span>
              )}
              {subtotal > 0 && (
                <span className="hidden md:inline pl-1 border-l border-emerald-600/40 font-mono text-slate-950">
                  {formatPrice(subtotal)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white lg:hidden border border-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Quick Category Navigation Bar */}
        <div className="hidden lg:flex items-center justify-between py-2.5 border-t border-slate-850">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  {cat === 'All' ? 'All Footwear' : cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              100% Authentic Guaranteed
            </span>
            <span>•</span>
            <span className="text-slate-300">30-Day Soles Trial</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-850 bg-slate-950 p-4 space-y-4 animate-in fade-in">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search kicks, models..."
              className="w-full bg-slate-900 text-sm text-slate-200 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border border-slate-800"
            />
          </div>

          {/* Mobile Categories */}
          <div>
            <p className="text-xs uppercase text-slate-400 font-bold mb-2">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-850'
                  }`}
                >
                  {cat === 'All' ? 'All Shoes' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bespoke Studio Mobile Button */}
          <button
            onClick={() => {
              setIsCustomizerOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-400 text-xs font-bold"
          >
            <Palette className="w-4 h-4" />
            Launch 3D Bespoke Shoe Studio
          </button>
        </div>
      )}
    </header>
  );
}
