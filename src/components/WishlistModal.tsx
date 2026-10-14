'use client';
import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Shoe } from '@/types/shoe';

interface WishlistModalProps {
  allShoes: Shoe[];
}

export function WishlistModal({ allShoes }: WishlistModalProps) {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    isWishlistOpen,
    setIsWishlistOpen,
    setSelectedShoeForModal,
    formatPrice,
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedShoes = allShoes.filter((s) => wishlist.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Saved Grails & Wishlist</h2>
              <p className="text-xs text-slate-400">{savedShoes.length} kicks saved</p>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedShoes.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-600">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">No saved kicks yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Tap the heart icon on any shoe to track price drops and build your wishlist.
                </p>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Explore Footwear
              </button>
            </div>
          ) : (
            savedShoes.map((shoe) => (
              <div
                key={shoe.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 group"
              >
                <div
                  onClick={() => {
                    setSelectedShoeForModal(shoe);
                    setIsWishlistOpen(false);
                  }}
                  className="w-20 h-20 rounded-xl bg-slate-900 p-2 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden"
                >
                  <img
                    src={shoe.images[0]}
                    alt={shoe.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-emerald-400 uppercase">
                        {shoe.brand}
                      </p>
                      <h4
                        onClick={() => {
                          setSelectedShoeForModal(shoe);
                          setIsWishlistOpen(false);
                        }}
                        className="text-xs font-bold text-white truncate cursor-pointer hover:text-emerald-400"
                      >
                        {shoe.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => toggleWishlist(shoe)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-extrabold text-white font-mono">
                      {formatPrice(shoe.price)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(shoe, shoe.sizes[0] || 9, shoe.colors[0], 1);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
