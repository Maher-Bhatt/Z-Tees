import { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@/data/products';

export type CartItem = {
  cartId: string;
  product: Product;
  size: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  updateQty: (cartId: string, qty: number) => void;
  removeItem: (cartId: string) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.cartId === existing.cartId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { cartId: `${Date.now()}-${Math.random()}`, product, size, qty: 1 }];
    });
  };

  const updateQty = (cartId: string, qty: number) => {
    if (qty < 1) {
      setCart(prev => prev.filter(i => i.cartId !== cartId));
      return;
    }
    setCart(prev => prev.map(i => (i.cartId === cartId ? { ...i, qty } : i)));
  };

  const removeItem = (cartId: string) =>
    setCart(prev => prev.filter(i => i.cartId !== cartId));

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
