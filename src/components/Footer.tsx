'use client';
import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Heart, Sparkles, Send } from 'lucide-react';
import { useToast } from './Toast';

export function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! 🎁', 'Use code SOLE15 for 15% off your next purchase.', 'success');
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      {/* Top Newsletter Bar */}
      <div className="border-b border-slate-850 py-10 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 justify-center md:justify-start">
                <Sparkles className="w-3.5 h-3.5" />
                SoleVault VIP Drops & Insider Access
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Unlock 15% Off Your First Drop
              </h3>
              <p className="text-xs text-slate-400">
                Receive instant release notifications, shock drop alerts, and exclusive bespoke member pricing.
              </p>
            </div>

            <div className="w-full max-w-md">
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the collective! Use promo code <strong>SOLE15</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email for shock drops..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M21.5 14.5c-.83-.83-2.02-1.28-3.23-1.23l-3.27.13-1.63-3.26c-.37-.74-1.12-1.21-1.95-1.23L4.7 8.7C3.12 8.65 1.8 9.94 1.76 11.53c-.02.66.19 1.3.59 1.82L4 15.5V19c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2.5c0-.75-.3-1.47-.83-2z" />
                </svg>
              </div>
              <span className="text-lg font-black text-white uppercase tracking-tight">
                SOLE<span className="text-emerald-400">VAULT</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier destination for authenticated high-performance sneakers, limited edition grails, and bespoke footwear customization. Engineered with Next.js 14, Tailwind CSS & MongoDB.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Stock • Global Physical Hubs</span>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Silhouettes</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-emerald-400 cursor-pointer">Road Marathon</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Hardwood Basketball</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">All-Weather GORE-TEX</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Street Retro & Dunk</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Bespoke 3D Lab</span></li>
            </ul>
          </div>

          {/* Brands */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Makers</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-emerald-400 cursor-pointer">Nike Innovation</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Adidas Originals</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Air Jordan Retros</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Salomon XT Series</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">On Running Cloud</span></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-emerald-400 cursor-pointer">Authenticity Guarantee</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">30-Day Risk-Free Soles</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Global Express Shipping</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Size Conversion Guide</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Order Tracking API</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© 2026 SOLEVAULT Inc. All rights reserved. Built with precision for sneaker enthusiasts.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
