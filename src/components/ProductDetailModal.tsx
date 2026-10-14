'use client';
import React, { useState } from 'react';
import {
  X,
  Star,
  Check,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Layers,
  Ruler,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { Shoe, ShoeColor, ShoeReview } from '@/types/shoe';
import { useShop } from '@/context/ShopContext';
import { useToast } from './Toast';

interface ProductDetailModalProps {
  shoe: Shoe | null;
  onClose: () => void;
}

export function ProductDetailModal({ shoe, onClose }: ProductDetailModalProps) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    formatPrice,
  } = useShop();
  const { showToast } = useToast();

  const [selectedColor, setSelectedColor] = useState<ShoeColor>(
    shoe?.colors[0] || { name: 'Default', hex: '#ffffff', image: shoe?.images[0] || '' }
  );
  const [selectedSize, setSelectedSize] = useState<number>(shoe?.sizes[2] || 9);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review Form State
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState<ShoeReview[]>(shoe?.reviews || []);

  if (!shoe) return null;

  const isFavorited = isInWishlist(shoe.id);
  const currentImage = shoe.images[activeImageIndex] || selectedColor.image;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      showToast('Missing Fields', 'Please provide your name and a review comment.', 'error');
      return;
    }

    const newRev: ShoeReview = {
      id: `rev-${Date.now()}`,
      author: reviewName,
      rating: reviewRating,
      date: 'Just now',
      comment: reviewComment,
      verified: true,
      fitRating: 'True to Size',
      helpfulCount: 0,
    };

    setLocalReviews([newRev, ...localReviews]);
    setReviewName('');
    setReviewComment('');
    showToast('Review Submitted! ⭐', 'Thank you for your feedback.', 'success');
  };

  const handleAddToCart = () => {
    addToCart(shoe, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Gallery (5 cols) */}
          <div className="lg:col-span-6 bg-slate-950 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
            <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 flex items-center justify-center overflow-hidden">
              {shoe.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                  {shoe.badge}
                </span>
              )}
              <img
                src={currentImage}
                alt={shoe.name}
                className="max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transform -rotate-6 transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
              {shoe.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-16 h-16 rounded-xl bg-slate-900 p-1 shrink-0 border transition-all ${
                    activeImageIndex === i
                      ? 'border-emerald-400 ring-2 ring-emerald-400/30'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Micro Guarantees */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-800/80 text-center text-[11px] text-slate-400">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-slate-800 px-1">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>Free 2-Day Air</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>30-Day Soles Trial</span>
              </div>
            </div>
          </div>

          {/* Right Info (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    {shoe.brand} • {shoe.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-bold">{shoe.rating}</span>
                    <span className="text-slate-400">({localReviews.length} reviews)</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {shoe.name}
                </h2>

                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {formatPrice(shoe.price)}
                  </span>
                  {shoe.originalPrice && (
                    <span className="text-base text-slate-500 line-through font-mono">
                      {formatPrice(shoe.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Stock: {shoe.stock} pairs left
                  </span>
                </div>
              </div>

              {/* Colorway Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Color: <span className="text-emerald-400">{selectedColor.name}</span>
                  </label>
                </div>
                <div className="flex items-center gap-2.5">
                  {shoe.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => {
                          setSelectedColor(color);
                          const idx = shoe.images.findIndex((img) => img === color.image);
                          if (idx !== -1) setActiveImageIndex(idx);
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 ring-2 ring-emerald-500/20'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs font-semibold">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Select US Men's Size
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold underline underline-offset-4"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {shoe.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    Add {quantity > 1 ? `(${quantity})` : ''} to Bag • {formatPrice(shoe.price * quantity)}
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(shoe)}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isFavorited
                        ? 'border-rose-500/40 bg-rose-500/15 text-rose-400'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Tabs: Description / Specs / Reviews */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-2">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors ${
                      activeTab === 'details'
                        ? 'text-emerald-400 border-b-2 border-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors ${
                      activeTab === 'specs'
                        ? 'text-emerald-400 border-b-2 border-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tech & Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors ${
                      activeTab === 'reviews'
                        ? 'text-emerald-400 border-b-2 border-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Reviews ({localReviews.length})
                  </button>
                </div>

                <div className="pt-3 text-xs leading-relaxed text-slate-300 min-h-[140px]">
                  {activeTab === 'details' && (
                    <div className="space-y-3">
                      <p>{shoe.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {shoe.technology.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-medium"
                          >
                            ✓ {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-500 font-semibold block">Weight</span>
                        <span className="text-white font-bold">{shoe.weight}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-500 font-semibold block">Heel-to-Toe Drop</span>
                        <span className="text-white font-bold">{shoe.drop}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-500 font-semibold block">Cushioning Grade</span>
                        <span className="text-emerald-400 font-bold">{shoe.cushioning}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-500 font-semibold block">Year / Edition</span>
                        <span className="text-white font-bold">{shoe.releaseYear} Edition</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      {/* Write Review Form */}
                      <form onSubmit={handleAddReview} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">Write a Customer Review</span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setReviewRating(s)}
                                className="text-slate-500 hover:text-amber-400"
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    s <= reviewRating
                                      ? 'text-amber-400 fill-amber-400'
                                      : 'text-slate-600'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                          <button
                            type="submit"
                            className="bg-emerald-500 text-slate-950 font-bold py-1.5 rounded-lg text-xs hover:bg-emerald-400 transition-colors"
                          >
                            Submit Review
                          </button>
                        </div>

                        <textarea
                          placeholder="How did the fit, cushioning, and style feel on foot?"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          rows={2}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </form>

                      {/* Reviews List */}
                      <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                        {localReviews.map((rev) => (
                          <div key={rev.id} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-850">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                                {rev.author}
                                {rev.verified && (
                                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-normal">
                                    Verified Buyer
                                  </span>
                                )}
                              </span>
                              <div className="flex items-center gap-0.5">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-slate-300 text-xs">{rev.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
