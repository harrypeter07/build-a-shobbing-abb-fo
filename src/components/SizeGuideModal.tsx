'use client';
import React from 'react';
import { X, Ruler, Footprints, Check } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

const SIZES_DATA = [
  { usMen: '7.0', usWomen: '8.5', uk: '6.0', eu: '40.0', cm: '25.0' },
  { usMen: '7.5', usWomen: '9.0', uk: '6.5', eu: '40.5', cm: '25.5' },
  { usMen: '8.0', usWomen: '9.5', uk: '7.0', eu: '41.0', cm: '26.0' },
  { usMen: '8.5', usWomen: '10.0', uk: '7.5', eu: '42.0', cm: '26.5' },
  { usMen: '9.0', usWomen: '10.5', uk: '8.0', eu: '42.5', cm: '27.0' },
  { usMen: '9.5', usWomen: '11.0', uk: '8.5', eu: '43.0', cm: '27.5' },
  { usMen: '10.0', usWomen: '11.5', uk: '9.0', eu: '44.0', cm: '28.0' },
  { usMen: '10.5', usWomen: '12.0', uk: '9.5', eu: '44.5', cm: '28.5' },
  { usMen: '11.0', usWomen: '12.5', uk: '10.0', eu: '45.0', cm: '29.0' },
  { usMen: '11.5', usWomen: '13.0', uk: '10.5', eu: '45.5', cm: '29.5' },
  { usMen: '12.0', usWomen: '13.5', uk: '11.0', eu: '46.0', cm: '30.0' },
  { usMen: '13.0', usWomen: '14.5', uk: '12.0', eu: '47.5', cm: '31.0' },
];

export function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-auto">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Shoe Size Conversion Guide</h2>
              <p className="text-xs text-slate-400">US, UK, EU, and CM Insole Chart</p>
            </div>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3 text-emerald-400 font-bold">US Men</th>
                  <th className="px-4 py-3">US Women</th>
                  <th className="px-4 py-3">UK</th>
                  <th className="px-4 py-3">EU</th>
                  <th className="px-4 py-3 font-mono text-cyan-400">CM (Length)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 font-mono">
                {SIZES_DATA.map((row) => (
                  <tr key={row.usMen} className="hover:bg-slate-850/50 text-slate-300">
                    <td className="px-4 py-2.5 font-bold text-white bg-slate-950/40">{row.usMen}</td>
                    <td className="px-4 py-2.5">{row.usWomen}</td>
                    <td className="px-4 py-2.5">{row.uk}</td>
                    <td className="px-4 py-2.5">{row.eu}</td>
                    <td className="px-4 py-2.5 text-cyan-400 font-bold">{row.cm} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Tip */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs leading-relaxed text-slate-300">
            <Footprints className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white mb-1">How to Measure Your Foot Length</p>
              <p className="text-slate-400">
                Place a sheet of paper against a wall. Stand on it with your heel touching the wall. Mark the tip of your longest toe and measure the distance in centimeters. If you are between sizes, we recommend sizing up 0.5 for running performance kicks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
