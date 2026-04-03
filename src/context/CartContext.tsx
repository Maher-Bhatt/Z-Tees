import { createContext, useContext, useState, type ReactNode } from 'react';
import { isSizeAvailable, type Product } from '@/data/products';

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
    if (!isSizeAvailable(product, size)) {
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.cartId === existing.cartId ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { cartId: `${Date.now()}-${Math.random()}`, product, size, qty: 1 }];
    });
  };

  const updateQty = (cartId: string, qty: number) => {
    if (qty < 1) {
      setCart(prev => prev.filter(item => item.cartId !== cartId));
      return;
    }

    setCart(prev => prev.map(item => (item.cartId === cartId ? { ...item, qty } : item)));
  };

  const removeItem = (cartId: string) =>
    setCart(prev => prev.filter(item => item.cartId !== cartId));

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }

  return ctx;
}
