'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Shoe, ShoeColor, CartItem } from '@/types/shoe';
import { useToast } from '@/components/Toast';

export type CurrencyType = 'USD' | 'EUR' | 'GBP' | 'JPY';

interface ShopContextType {
  cart: CartItem[];
  addToCart: (shoe: Shoe, size: number, color?: ShoeColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  appliedPromoDiscount: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  shippingFee: number;
  tax: number;
  total: number;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  
  wishlist: string[];
  toggleWishlist: (shoe: Shoe) => void;
  isInWishlist: (shoeId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  selectedShoeForModal: Shoe | null;
  setSelectedShoeForModal: (shoe: Shoe | null) => void;

  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;

  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  compareList: Shoe[];
  toggleCompare: (shoe: Shoe) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (priceInUSD: number) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CURRENCY_RATES: Record<CurrencyType, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 155.0 },
};

const PROMO_CODES: Record<string, number> = {
  KICKS20: 0.20,
  SOLE15: 0.15,
  VIP30: 0.30,
  FREESHIP: 0.05,
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['kicks-001', 'kicks-003']);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromoDiscount, setAppliedPromoDiscount] = useState(0);
  const [currency, setCurrency] = useState<CurrencyType>('USD');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedShoeForModal, setSelectedShoeForModal] = useState<Shoe | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [compareList, setCompareList] = useState<Shoe[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Initialize cart from localStorage if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('solevault_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem('solevault_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      // LocalStorage not available or parse error
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('solevault_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('solevault_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const addToCart = (shoe: Shoe, size: number, color?: ShoeColor, quantity: number = 1) => {
    const selectedColor = color || shoe.colors[0];
    const cartItemId = `${shoe.id}-${size}-${selectedColor.name}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          shoe,
          selectedSize: size,
          selectedColor,
          quantity,
        },
      ];
    });

    showToast('Added to Cart 👟', `${shoe.name} (US ${size}) ready for checkout.`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Removed from Cart', 'Item removed from your bag.', 'info');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setAppliedPromoDiscount(0);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.shoe.price * item.quantity, 0);
  const discount = Math.round(subtotal * appliedPromoDiscount);
  const shippingFee = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const tax = Math.round((subtotal - discount) * 0.0825);
  const total = Math.max(0, subtotal - discount + (subtotal > 0 ? shippingFee : 0) + tax);

  const applyPromo = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (PROMO_CODES[formatted]) {
      const rate = PROMO_CODES[formatted];
      setPromoCode(formatted);
      setAppliedPromoDiscount(rate);
      showToast('Promo Code Applied! 🎉', `Received ${rate * 100}% off your order.`, 'success');
      return { success: true, message: `Saved ${rate * 100}% with ${formatted}!` };
    }
    showToast('Invalid Code', 'Please enter a valid coupon like KICKS20 or SOLE15', 'error');
    return { success: false, message: 'Invalid promo code' };
  };

  const removePromo = () => {
    setPromoCode('');
    setAppliedPromoDiscount(0);
    showToast('Promo Removed', 'Discount removed from your order.', 'info');
  };

  const isInWishlist = (shoeId: string) => wishlist.includes(shoeId);

  const toggleWishlist = (shoe: Shoe) => {
    if (wishlist.includes(shoe.id)) {
      setWishlist((prev) => prev.filter((id) => id !== shoe.id));
      showToast('Removed from Wishlist', `${shoe.name} was removed.`, 'info');
    } else {
      setWishlist((prev) => [...prev, shoe.id]);
      showToast('Saved to Wishlist ❤️', `${shoe.name} saved to your favorites.`, 'success');
    }
  };

  const toggleCompare = (shoe: Shoe) => {
    const exists = compareList.some((s) => s.id === shoe.id);
    if (exists) {
      setCompareList((prev) => prev.filter((s) => s.id !== shoe.id));
      showToast('Removed from Compare', `${shoe.name} removed from comparison.`, 'info');
    } else {
      if (compareList.length >= 3) {
        showToast('Comparison Full', 'You can compare up to 3 kicks at once.', 'error');
        return;
      }
      setCompareList((prev) => [...prev, shoe]);
      showToast('Added to Compare 📊', `${shoe.name} added. Click compare to view specs!`, 'success');
    }
  };

  const formatPrice = (priceInUSD: number) => {
    const { symbol, rate } = CURRENCY_RATES[currency];
    const converted = priceInUSD * rate;
    if (currency === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        promoCode,
        appliedPromoDiscount,
        applyPromo,
        removePromo,
        shippingFee,
        tax,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedShoeForModal,
        setSelectedShoeForModal,
        isCustomizerOpen,
        setIsCustomizerOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        compareList,
        toggleCompare,
        isCompareOpen,
        setIsCompareOpen,
        currency,
        setCurrency,
        formatPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
