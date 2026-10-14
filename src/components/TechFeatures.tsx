'use client';
import React from 'react';
import { Wind, Shield, Zap, Sparkles, Flame, CheckCircle } from 'lucide-react';

export function TechFeatures() {
  const features = [
    {
      icon: Zap,
      title: 'Full-Length Carbon Plates',
      subtitle: 'Propulsion Lever System',
      description: 'Spoon-shaped carbon fiber inserts maximize foot torque and energy efficiency for lightning-fast toe-offs.',
      tag: 'Speed Tech',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
    {
      icon: Wind,
      title: 'Dual Air & Supercritical Foam',
      subtitle: 'Zero Impact Shockwaves',
      description: 'Pressurized gas capsules absorb joint strain upon footstrike and instantly spring back with 85% energy return.',
      tag: 'Cushioning',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      icon: Shield,
      title: 'ePE GORE-TEX Shield',
      subtitle: 'Waterproof Membrane',
      description: 'Billions of micropores block raindrops and slush while allowing foot sweat vapor to escape freely.',
      tag: 'Weatherproof',
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      icon: Sparkles,
      title: 'Adaptive Flyknit Weave',
      subtitle: 'Seamless Ergonomic Lock',
      description: 'Zonally engineered yarn delivers breathability where you heat up and structured support where you plant.',
      tag: 'Containment',
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
    },
  ];

  return (
    <section className="py-12 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Footwear Science & Engineering
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Engineered for Groundbreaking Performance
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Every sole in the SoleVault archive is audited for biomechanical innovation and peerless comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all hover:shadow-xl space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center border ${feat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                    {feat.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-400">{feat.subtitle}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
