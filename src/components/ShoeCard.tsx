'use client';
import React, { useState } from 'react';
import {
  Heart,
  Eye,
  Star,
  Plus,
  Check,
  Zap,
  SlidersHorizontal,
  Layers,
} from 'lucide-react';
import { Shoe, ShoeColor } from '@/types/shoe';
import { useShop } from '@/context/ShopContext';

interface ShoeCardProps {
  shoe: Shoe;
  viewMode?: 'grid' | 'list';
}

export function ShoeCard({ shoe, viewMode = 'grid' }: ShoeCardProps) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedShoeForModal,
    compareList,
    toggleCompare,
    formatPrice,
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ShoeColor>(shoe.colors[0] || { name: 'Default', hex: '#ffffff', image: shoe.images[0] });
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [justAddedSize, setJustAddedSize] = useState<number | null>(null);

  const isFavorited = isInWishlist(shoe.id);
  const isCompared = compareList.some((s) => s.id === shoe.id);

  const displayImage = isHovered && shoe.images[1] && selectedColor === shoe.colors[0]
    ? shoe.images[1]
    : (selectedColor?.image || shoe.images[0]);

  const discountPercent = shoe.originalPrice
    ? Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100)
    : null;

  const handleQuickAdd = (size: number, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(shoe, size, selectedColor, 1);
    setJustAddedSize(size);
    setTimeout(() => {
      setJustAddedSize(null);
      setShowQuickSizes(false);
    }, 1200);
  };

  if (viewMode === 'list') {
    return (
      <div className="group relative flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all hover:shadow-xl hover:shadow-black/40">
        {/* Left Image */}
        <div
          onClick={() => setSelectedShoeForModal(shoe)}
          className="relative w-full sm:w-56 h-48 rounded-xl bg-slate-950 p-4 flex items-center justify-center overflow-hidden cursor-pointer shrink-0"
        >
          <img
            src={displayImage}
            alt={shoe.name}
            className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
          />
          {shoe.badge && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-500/90 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
              {shoe.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-2 w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {shoe.brand} • {shoe.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-300">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-semibold">{shoe.rating}</span>
              <span className="text-slate-500">({shoe.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => setSelectedShoeForModal(shoe)}
            className="text-lg font-bold text-white hover:text-emerald-400 cursor-pointer transition-colors"
          >
            {shoe.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {shoe.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {shoe.technology.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-white font-mono">
                {formatPrice(shoe.price)}
              </span>
              {shoe.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-mono">
                  {formatPrice(shoe.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(shoe)}
                className={`p-2 rounded-xl border transition-colors ${
                  isFavorited
                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => setSelectedShoeForModal(shoe)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all"
              >
                Select Options
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
      className="group relative flex flex-col rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 overflow-hidden"
    >
      {/* Top badges & Wishlist/Compare */}
      <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 p-4 flex items-center justify-center overflow-hidden">
        {/* Badges Left */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {shoe.badge && (
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
              {shoe.badge}
            </span>
          )}
          {discountPercent && discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[10px] font-black uppercase tracking-wider">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Action icons Right */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(shoe);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isFavorited
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 scale-105'
                : 'bg-slate-950/70 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
            title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={() => setSelectedShoeForModal(shoe)}
            className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Compare Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(shoe);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 ${
              isCompared
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 opacity-100'
                : 'bg-slate-950/70 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
            title="Compare Specs"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

        {/* Shoe Image */}
        <div
          onClick={() => setSelectedShoeForModal(shoe)}
          className="w-full h-full flex items-center justify-center cursor-pointer transition-transform duration-500 group-hover:scale-105"
        >
          <img
            src={displayImage}
            alt={shoe.name}
            className="max-h-[85%] max-w-[90%] object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.6)] transform -rotate-3 group-hover:rotate-0 transition-transform duration-300"
          />
        </div>

        {/* Quick Size Overlay Slide-up */}
        {showQuickSizes && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md p-4 flex flex-col justify-center items-center z-20 animate-in fade-in duration-200">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">Select US Size</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickSizes(false);
                }}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5 w-full">
              {shoe.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => handleQuickAdd(sz, e)}
                  className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    justAddedSize === sz
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-emerald-500/50 hover:bg-slate-850'
                  }`}
                >
                  {justAddedSize === sz ? '✓' : sz}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-3">Click size for instant bag addition</p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Brand & Rating */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
              {shoe.brand}
            </span>
            <div className="flex items-center gap-1 text-slate-400">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-slate-200 text-xs">{shoe.rating}</span>
              <span className="text-[10px]">({shoe.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedShoeForModal(shoe)}
            className="text-sm font-bold text-white hover:text-emerald-400 cursor-pointer line-clamp-1 transition-colors"
          >
            {shoe.name}
          </h3>

          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
            {shoe.category} • {shoe.gender} • {shoe.cushioning}
          </p>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            {shoe.colors.map((color) => {
              const isCurrent = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    isCurrent
                      ? 'ring-2 ring-emerald-400 ring-offset-1 ring-offset-slate-900 scale-110'
                      : 'border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              );
            })}
            <span className="text-[10px] text-slate-400 ml-1">
              {shoe.colors.length} {shoe.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            {shoe.stock <= 5 ? (
              <span className="text-amber-400 font-bold">Only {shoe.stock} left!</span>
            ) : (
              'In Stock'
            )}
          </span>
        </div>

        {/* Price & Quick Buy Button */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-white font-mono">
                {formatPrice(shoe.price)}
              </span>
              {shoe.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-mono">
                  {formatPrice(shoe.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Size Trigger */}
            <button
              onClick={() => setShowQuickSizes(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all hover:scale-105 active:scale-95"
              title="Quick Add with Size Picker"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
