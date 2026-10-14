'use client';
import React from 'react';
import { ShoeBrand } from '@/types/shoe';

interface BrandMarqueeProps {
  onSelectBrand: (brand: ShoeBrand) => void;
  selectedBrand: ShoeBrand;
}

const BRANDS = [
  { name: 'Nike' as ShoeBrand, tag: 'Just Do It' },
  { name: 'Adidas' as ShoeBrand, tag: 'Impossible Is Nothing' },
  { name: 'Air Jordan' as ShoeBrand, tag: 'Flight Heritage' },
  { name: 'New Balance' as ShoeBrand, tag: 'Fearlessly Independent' },
  { name: 'Asics' as ShoeBrand, tag: 'Sound Mind Sound Body' },
  { name: 'Salomon' as ShoeBrand, tag: 'Tomorrow Is Yours' },
  { name: 'On Running' as ShoeBrand, tag: 'Ignite The Human Spirit' },
  { name: 'Puma' as ShoeBrand, tag: 'Forever Faster' },
];

export function BrandMarquee({ onSelectBrand, selectedBrand }: BrandMarqueeProps) {
  return (
    <div className="w-full py-8 border-y border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Featured Partner Brands
          </p>
          <span className="text-xs text-emerald-400 font-medium">100% Licensed & Verified Stock</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {BRANDS.map((b) => {
            const isSelected = selectedBrand === b.name;
            return (
              <button
                key={b.name}
                onClick={() => onSelectBrand(isSelected ? 'All' : b.name)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <p className="text-xs font-black tracking-tight">{b.name}</p>
                <p className={`text-[9px] mt-0.5 truncate ${isSelected ? 'text-slate-950 font-medium' : 'text-slate-500'}`}>
                  {b.tag}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
