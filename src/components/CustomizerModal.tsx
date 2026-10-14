'use client';
import React, { useState } from 'react';
import {
  X,
  Palette,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Check,
  Zap,
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Shoe } from '@/types/shoe';

const PALETTES = [
  { name: 'Volt Cyber', hex: '#ccff00' },
  { name: 'Stealth Black', hex: '#111827' },
  { name: 'Pure White', hex: '#f8fafc' },
  { name: 'Solar Crimson', hex: '#ef4444' },
  { name: 'Hyper Cyan', hex: '#06b6d4' },
  { name: 'Desert Dune', hex: '#d97706' },
  { name: 'Royal Violet', hex: '#8b5cf6' },
  { name: 'Signal Orange', hex: '#f97316' },
];

export function CustomizerModal() {
  const { isCustomizerOpen, setIsCustomizerOpen, addToCart, formatPrice } = useShop();

  const [upperColor, setUpperColor] = useState('#111827');
  const [accentColor, setAccentColor] = useState('#ccff00');
  const [soleColor, setSoleColor] = useState('#ffffff');
  const [lacesColor, setLacesColor] = useState('#ccff00');
  const [customText, setCustomText] = useState('2026');
  const [selectedSize, setSelectedSize] = useState<number>(10);
  const [activeZone, setActiveZone] = useState<'upper' | 'accent' | 'sole' | 'laces'>('upper');

  if (!isCustomizerOpen) return null;

  const bespokePrice = 245;

  const handleReset = () => {
    setUpperColor('#111827');
    setAccentColor('#ccff00');
    setSoleColor('#ffffff');
    setLacesColor('#ccff00');
    setCustomText('2026');
  };

  const handleAddBespokeToCart = () => {
    const bespokeShoe: Shoe = {
      id: `bespoke-${Date.now()}`,
      name: `Bespoke Air Matrix "${customText || 'Custom'}"`,
      brand: 'Nike',
      slug: `bespoke-matrix-${Date.now()}`,
      price: bespokePrice,
      category: 'Lifestyle',
      gender: 'Unisex',
      rating: 5.0,
      reviewsCount: 1,
      badge: '1 OF 1 BESPOKE',
      stock: 1,
      releaseYear: 2026,
      description: `Custom one-of-a-kind bespoke shoe created in the SoleVault Lab with custom heel engraving "${customText}".`,
      technology: ['Bespoke Colorway', 'Custom Laser Engraving', 'Zoom Air Cushioning'],
      weight: '240g',
      cushioning: 'Maximum',
      drop: '10mm',
      sizes: [selectedSize],
      colors: [
        {
          name: `Custom (${customText})`,
          hex: accentColor,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
        },
      ],
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      ],
      reviews: [],
    };

    addToCart(bespokeShoe, selectedSize, bespokeShoe.colors[0], 1);
    setIsCustomizerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">SoleVault Bespoke Lab</h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.2 rounded-full font-bold uppercase tracking-wider">
                  Interactive 3D Studio
                </span>
              </div>
              <p className="text-xs text-slate-400">Design your personalized 1-of-1 silhouette</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 p-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
            <button
              onClick={() => setIsCustomizerOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Canvas: Live Vector Sneaker */}
          <div className="lg:col-span-7 bg-slate-950 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800 relative min-h-[320px]">
            {/* Ambient Backlight */}
            <div
              className="absolute w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: accentColor }}
            />

            {/* Custom SVG Sneaker Renderer */}
            <div className="relative w-full max-w-md aspect-[16/10] flex items-center justify-center">
              <svg
                viewBox="0 0 500 320"
                className="w-full h-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
              >
                {/* Sole / Outsole & Air Unit */}
                <g id="sole-group">
                  <path
                    d="M 60 250 C 120 250, 180 260, 240 260 C 320 260, 420 255, 460 220 C 470 210, 475 230, 460 245 C 410 280, 290 285, 210 285 C 130 285, 50 280, 40 255 C 38 250, 45 250, 60 250 Z"
                    fill={soleColor}
                    stroke="#1e293b"
                    strokeWidth="3"
                  />
                  {/* Cushioning Pods */}
                  <ellipse cx="140" cy="270" rx="28" ry="8" fill={accentColor} opacity="0.85" />
                  <ellipse cx="210" cy="272" rx="26" ry="8" fill={accentColor} opacity="0.85" />
                  <ellipse cx="280" cy="271" rx="26" ry="8" fill={accentColor} opacity="0.85" />
                  <ellipse cx="350" cy="265" rx="24" ry="7" fill={accentColor} opacity="0.85" />
                </g>

                {/* Upper Body */}
                <g id="upper-group">
                  <path
                    d="M 65 248 C 60 170, 95 140, 150 130 C 180 125, 230 160, 280 170 C 350 175, 410 195, 460 220 C 430 240, 350 250, 240 250 C 170 250, 100 248, 65 248 Z"
                    fill={upperColor}
                    stroke="#334155"
                    strokeWidth="3"
                  />
                  {/* Heel Counter Tab */}
                  <path
                    d="M 65 248 C 60 180, 70 145, 110 140 C 95 170, 95 210, 95 248 Z"
                    fill="#1f2937"
                  />
                  {/* Custom Engraved Heel Text */}
                  <text
                    x="85"
                    y="190"
                    fill="#f8fafc"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    transform="rotate(-75, 85, 190)"
                  >
                    {customText}
                  </text>
                </g>

                {/* Tongue & Collar */}
                <path
                  d="M 150 130 C 180 80, 215 90, 240 125 C 215 140, 180 135, 150 130 Z"
                  fill="#1e293b"
                />

                {/* Laces */}
                <g id="laces-group">
                  <line x1="185" y1="125" x2="225" y2="145" stroke={lacesColor} strokeWidth="5" strokeLinecap="round" />
                  <line x1="205" y1="135" x2="245" y2="155" stroke={lacesColor} strokeWidth="5" strokeLinecap="round" />
                  <line x1="225" y1="145" x2="265" y2="165" stroke={lacesColor} strokeWidth="5" strokeLinecap="round" />
                  <line x1="245" y1="155" x2="285" y2="175" stroke={lacesColor} strokeWidth="5" strokeLinecap="round" />
                </g>

                {/* Iconic Dynamic Swoosh / Speed Vector */}
                <path
                  d="M 140 215 C 220 225, 330 190, 420 140 C 370 175, 290 235, 190 238 C 160 239, 130 228, 140 215 Z"
                  fill={accentColor}
                  filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
                />
              </svg>
            </div>

            {/* Heel Tag Indicator */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Laser Heel Engraving: <strong className="text-white font-mono">{customText || 'None'}</strong></span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="lg:col-span-5 p-6 space-y-5">
            {/* Zone Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Select Shoe Zone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'upper', label: 'Main Upper', color: upperColor },
                  { id: 'accent', label: 'Swoosh & Air', color: accentColor },
                  { id: 'sole', label: 'Outsole & Base', color: soleColor },
                  { id: 'laces', label: 'Laces & Eyelets', color: lacesColor },
                ].map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setActiveZone(z.id as any)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
                      activeZone === z.id
                        ? 'bg-emerald-500/15 border-emerald-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{z.label}</span>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/40"
                      style={{ backgroundColor: z.color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette for Active Zone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. Pick Color for{' '}
                <span className="text-emerald-400 capitalize">{activeZone}</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PALETTES.map((p) => {
                  const currentHex =
                    activeZone === 'upper'
                      ? upperColor
                      : activeZone === 'accent'
                      ? accentColor
                      : activeZone === 'sole'
                      ? soleColor
                      : lacesColor;
                  const isSelected = currentHex.toLowerCase() === p.hex.toLowerCase();

                  return (
                    <button
                      key={p.name}
                      onClick={() => {
                        if (activeZone === 'upper') setUpperColor(p.hex);
                        if (activeZone === 'accent') setAccentColor(p.hex);
                        if (activeZone === 'sole') setSoleColor(p.hex);
                        if (activeZone === 'laces') setLacesColor(p.hex);
                      }}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        isSelected
                          ? 'border-emerald-400 ring-2 ring-emerald-500/20 bg-slate-950'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-white/20"
                        style={{ backgroundColor: p.hex }}
                      />
                      <span className="text-[10px] text-slate-300 truncate w-full text-center">
                        {p.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Laser Engraving Text Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                3. Custom Heel Laser Text (Max 6 chars)
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 2026, AIR, BOST"
                value={customText}
                onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest outline-none focus:border-emerald-500"
              />
            </div>

            {/* Size Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                4. Select US Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[8, 8.5, 9, 9.5, 10, 10.5, 11, 12].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-9 h-8 rounded-lg text-xs font-bold border transition-all ${
                      selectedSize === sz
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Bespoke to Bag */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Bespoke Crafted</p>
                <p className="text-lg font-black text-white font-mono">{formatPrice(bespokePrice)}</p>
              </div>

              <button
                onClick={handleAddBespokeToCart}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Add 1-of-1 to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
