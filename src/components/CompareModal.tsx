'use client';
import React from 'react';
import { X, Layers, Trash2, ShoppingBag, Check } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export function CompareModal() {
  const {
    compareList,
    toggleCompare,
    isCompareOpen,
    setIsCompareOpen,
    addToCart,
    formatPrice,
  } = useShop();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Compare Shoe Specs</h2>
              <p className="text-xs text-slate-400">Side-by-side engineering breakdown</p>
            </div>
          </div>

          <button
            onClick={() => setIsCompareOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-x-auto">
          {compareList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-slate-400">No shoes currently selected for comparison.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 min-w-[600px]">
              {compareList.map((shoe) => (
                <div key={shoe.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      {shoe.brand}
                    </span>
                    <button
                      onClick={() => toggleCompare(shoe)}
                      className="text-slate-500 hover:text-rose-400"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="h-32 flex items-center justify-center">
                    <img src={shoe.images[0]} alt={shoe.name} className="max-h-full max-w-full object-contain" />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white line-clamp-1">{shoe.name}</h3>
                    <p className="text-sm font-extrabold text-emerald-400 font-mono mt-0.5">
                      {formatPrice(shoe.price)}
                    </p>
                  </div>

                  {/* Spec List */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-850">
                      <span className="text-slate-500">Weight</span>
                      <span className="text-slate-200 font-medium">{shoe.weight}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-850">
                      <span className="text-slate-500">Cushioning</span>
                      <span className="text-emerald-400 font-semibold">{shoe.cushioning}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-850">
                      <span className="text-slate-500">Drop</span>
                      <span className="text-cyan-400 font-semibold">{shoe.drop}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-850">
                      <span className="text-slate-500">Category</span>
                      <span className="text-slate-200 font-medium">{shoe.category}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-850">
                      <span className="text-slate-500">Rating</span>
                      <span className="text-amber-400 font-bold">{shoe.rating}★</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(shoe, shoe.sizes[0] || 9, shoe.colors[0], 1);
                      setIsCompareOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all mt-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add to Bag
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
