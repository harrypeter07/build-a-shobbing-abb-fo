'use client';
import React from 'react';
import {
  RotateCcw,
  SlidersHorizontal,
  Check,
  Search,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ShoeBrand, ShoeCategory, FilterState } from '@/types/shoe';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
  availableBrands: ShoeBrand[];
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const ALL_SIZES = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];
const CUSHIONING_OPTIONS = ['All', 'Maximum', 'Responsive', 'Balanced', 'Firm'];
const BADGE_OPTIONS = ['All', 'LIMITED DROP', 'TOP RATED', 'BEST SELLER', 'WATERPROOF', 'RACE DAY'];

export function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
  availableBrands,
  isMobileOpen,
  onCloseMobile,
}: FilterSidebarProps) {
  const toggleSize = (size: number) => {
    if (filters.selectedSizes.includes(size)) {
      onFilterChange('selectedSizes', filters.selectedSizes.filter((s) => s !== size));
    } else {
      onFilterChange('selectedSizes', [...filters.selectedSizes, size]);
    }
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.brand !== 'All' ||
    filters.searchQuery !== '' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 350 ||
    filters.selectedSizes.length > 0 ||
    filters.cushioning !== '' ||
    filters.badgeFilter !== '' ||
    filters.inStockOnly;

  return (
    <aside className="w-full space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Refine Kicks
          </h2>
          <span className="text-xs bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full">
            {totalResultsCount}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Brand Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Brand
        </label>
        <div className="flex flex-wrap gap-1.5">
          {availableBrands.map((brand) => {
            const isSelected = filters.brand === brand;
            return (
              <button
                key={brand}
                onClick={() => onFilterChange('brand', brand)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Price Range
          </label>
          <span className="text-xs font-mono font-bold text-emerald-400">
            ${filters.minPrice} - ${filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="350"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Min: $50</span>
          <span>Max: $350+</span>
        </div>
      </div>

      {/* Shoe Sizes Grid */}
      <div className="space-y-2.5 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            US Men's Size
          </label>
          {filters.selectedSizes.length > 0 && (
            <span className="text-[11px] text-emerald-400 font-semibold">
              {filters.selectedSizes.length} selected
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {ALL_SIZES.map((size) => {
            const isSelected = filters.selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cushioning Profile */}
      <div className="space-y-2.5 pt-3 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Cushioning Feel
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {CUSHIONING_OPTIONS.map((cushion) => {
            const isSelected = (filters.cushioning || 'All') === cushion;
            return (
              <button
                key={cushion}
                onClick={() => onFilterChange('cushioning', cushion === 'All' ? '' : cushion)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {cushion}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Drop Badges */}
      <div className="space-y-2.5 pt-3 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Special Collections
        </label>
        <div className="flex flex-wrap gap-1.5">
          {BADGE_OPTIONS.map((badge) => {
            const isSelected = (filters.badgeFilter || 'All') === badge;
            return (
              <button
                key={badge}
                onClick={() => onFilterChange('badgeFilter', badge === 'All' ? '' : badge)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {badge}
              </button>
            );
          })}
        </div>
      </div>

      {/* In-stock toggle */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-white">In Stock Only</p>
          <p className="text-[11px] text-slate-400">Hide sold out sizes</p>
        </div>
        <button
          onClick={() => onFilterChange('inStockOnly', !filters.inStockOnly)}
          className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 ${
            filters.inStockOnly ? 'bg-emerald-500' : 'bg-slate-800'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
              filters.inStockOnly ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </aside>
  );
}
