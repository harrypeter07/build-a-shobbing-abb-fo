import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SOLEVAULT — The Premier Sneaker & Footwear Archive',
  description: 'Shop verified authentic limited drops, high-performance running shoes, and custom bespoke footwear.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}