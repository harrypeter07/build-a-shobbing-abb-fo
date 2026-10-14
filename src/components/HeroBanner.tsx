'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  Star,
  Layers,
  Palette,
} from 'lucide-react';
import { Shoe } from '@/types/shoe';
import { useShop } from '@/context/ShopContext';

interface HeroBannerProps {
  featuredShoe: Shoe;
  onExploreClick: () => void;
}

export function HeroBanner({ featuredShoe, onExploreClick }: HeroBannerProps) {
  const { addToCart, setSelectedShoeForModal, setIsCustomizerOpen, formatPrice } = useShop();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentColor = featuredShoe.colors[selectedColorIndex] || featuredShoe.colors[0];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16 border-b border-slate-850">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Drop 2026
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                {featuredShoe.rating} ({featuredShoe.reviewsCount} reviews)
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.08] font-sans">
                AIR VAPORMAX <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  FLYKNIT MATRIX
                </span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Dual-density pressurized Air pods paired with adaptive Flyknit 3.0 weave.
                Engineered for maximum energy return and supreme streetwear aesthetics.
              </p>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md max-w-lg">
              <div className="text-center sm:text-left">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Weight</p>
                <p className="text-sm font-bold text-slate-100">{featuredShoe.weight}</p>
              </div>
              <div className="text-center sm:text-left border-x border-slate-800 px-3">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Cushioning</p>
                <p className="text-sm font-bold text-emerald-400">{featuredShoe.cushioning}</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Offset Drop</p>
                <p className="text-sm font-bold text-cyan-400">{featuredShoe.drop}</p>
              </div>
            </div>

            {/* Price & Buy Now */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                    {formatPrice(featuredShoe.price)}
                  </span>
                  {featuredShoe.originalPrice && (
                    <span className="text-base text-slate-500 line-through font-mono">
                      {formatPrice(featuredShoe.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">In Stock • Ready for dispatch</p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => addToCart(featuredShoe, 10, currentColor)}
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  Instant Buy (Size 10)
                </button>

                <button
                  onClick={() => setSelectedShoeForModal(featuredShoe)}
                  className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm transition-all hover:border-slate-600"
                >
                  Inspect Details
                </button>
              </div>
            </div>

            {/* Colorway Switcher */}
            <div className="pt-1 flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Colorway:</span>
              <div className="flex items-center gap-2">
                {featuredShoe.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColorIndex(index);
                      setActiveImageIndex(index % featuredShoe.images.length);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                      selectedColorIndex === index
                        ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/40"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visualizer */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 p-6 flex items-center justify-center overflow-hidden shadow-2xl group">
              {/* Radial glow background */}
              <div className="absolute inset-0 bg-radial-gradient from-emerald-500/15 via-transparent to-transparent pointer-events-none" />

              {/* Main Shoe Image */}
              <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <img
                  src={currentColor.image || featuredShoe.images[activeImageIndex]}
                  alt={featuredShoe.name}
                  className="max-h-[85%] max-w-[90%] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] transform -rotate-6 transition-all duration-300"
                />
              </div>

              {/* Floating Technology Pill */}
              <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-700/60 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Patented Core</p>
                <p className="text-xs font-semibold text-slate-200">Full-Length Air Pods 3.0</p>
              </div>

              {/* Bespoke Studio Quick Trigger */}
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all hover:scale-105"
              >
                <Palette className="w-3.5 h-3.5 text-emerald-400" />
                Customize Colors
              </button>

              {/* Angle thumbnails */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
                {featuredShoe.images.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-10 h-10 rounded-xl overflow-hidden border transition-all ${
                      activeImageIndex === i
                        ? 'border-emerald-400 ring-2 ring-emerald-400/30 scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Value Props Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-850">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-850">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Authentic</p>
              <p className="text-[11px] text-slate-400">Triple-verified legit check</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-850">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Express Dispatch</p>
              <p className="text-[11px] text-slate-400">Next-day air available</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-850">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">30-Day Soles Trial</p>
              <p className="text-[11px] text-slate-400">Run in them, love or return</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-850">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Collector Packaging</p>
              <p className="text-[11px] text-slate-400">Mint double-box shipping</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
